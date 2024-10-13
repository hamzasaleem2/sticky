import { paginationOptsValidator } from "convex/server";
import { internalMutation as rawInternalMutation, mutation as rawMutation, query, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { TableAggregate } from "@convex-dev/aggregate";
import { DataModel } from "./_generated/dataModel";
import { components } from "./_generated/api";
import { Triggers } from "convex-helpers/server/triggers";
import { customMutation,customCtx } from "convex-helpers/server/customFunctions";

const aggregateBoardsByUser = new TableAggregate<[string, boolean], DataModel, "boards">(
  components.aggregateBoardsByUser,
  (doc) => [doc.ownerId, doc.inTrash],
);

const triggers = new Triggers<DataModel,MutationCtx>();

triggers.register("boards", aggregateBoardsByUser.trigger());

const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));
const internalMutation = customMutation(rawInternalMutation, customCtx(triggers.wrapDB));

export const backfillAggregates = internalMutation({
  handler: async (ctx) => {
    await aggregateBoardsByUser.clear(ctx);

    for await (const doc of ctx.db.query("boards")) {
      await aggregateBoardsByUser.insert(ctx, doc);
    }
  },
});

export const getUserBoardsCount = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    return await aggregateBoardsByUser.count(ctx, { prefix: [user._id, false] });
  },
});

export const getUserBoardsTrashCount = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    return await aggregateBoardsByUser.count(ctx, { prefix: [user._id, true] });
  },
});

export const getBoards = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    return await ctx.db
      .query("boards")
      .withIndex("by_owner", (q) => q.eq("ownerId", user._id))
      .collect();
  },
});

export const getBoard = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }

    const board = await ctx.db.get(args.boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    if (board.isShared && !board.inTrash || board.ownerId === user._id) { return board; }
    else throw new Error("Access denied");
    // if (board.ownerId !== user._id || board.inTrash) {
    //   if (!board.isShared) {
    //     throw new Error("Access denied");
    //   }
    // }

    return board;
  },
});

export const getBoardOwner = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.boardId);
    if (!board) return null;
    const owner = await ctx.db.get(board.ownerId);
    return owner ? owner.name : null;
  },
});

export const createBoard = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }

    const boardId = await ctx.db.insert("boards", {
      name: args.name,
      ownerId: user._id,
      isShared: false,
      notesCount: 0,
      inTrash: false,
      lastModified: Date.now()
    });
    return boardId;
  },
});

export const updateBoard = mutation({
  args: { boardId: v.id("boards"), name: v.string() },
  handler: async (ctx, args) => {
    const { boardId, name } = args;
    await ctx.db.patch(boardId, { name, lastModified: Date.now() });
  },
});

export const deleteBoard = mutation({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const { boardId } = args;
    await ctx.db.patch(boardId, { inTrash: true, isShared: false, shareCode: "" });
  },
});

export const restoreBoard = mutation({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const { boardId } = args;
    await ctx.db.patch(boardId, { inTrash: false });
  },
});

export const permanentlyDeleteBoard = mutation({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const { boardId } = args;
    const board = await ctx.db.get(boardId);
    if (!board) throw new Error("Board not found");

    return await ctx.db.delete(boardId);
  },
});

export const getLazyBoards = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchTerm: v.optional(v.string()),
    sortBy: v.union(v.literal("Recent"), v.literal("Oldest"), v.literal("Alphabetical"), v.literal("Most Notes")),
    showTrashed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }

    let boardsQuery;

    switch (args.sortBy) {
      case "Recent":
        boardsQuery = ctx.db.query("boards").withIndex("by_owner_and_modified", (q) => q.eq("ownerId", user._id)).order("desc");
        break;
      case "Oldest":
        boardsQuery = ctx.db.query("boards").withIndex("by_owner_and_modified", (q) => q.eq("ownerId", user._id)).order("asc");
        break;
      case "Alphabetical":
        boardsQuery = ctx.db.query("boards").withIndex("by_owner_and_name", (q) => q.eq("ownerId", user._id)).order("asc");
        break;
      case "Most Notes":
        boardsQuery = ctx.db.query("boards").withIndex("by_owner_and_notes", (q) => q.eq("ownerId", user._id)).order("desc");
        break;
      default:
        boardsQuery = ctx.db.query("boards").withIndex("by_owner_and_modified", (q) => q.eq("ownerId", user._id)).order("desc");
    }

    if (args.searchTerm) {
      boardsQuery = ctx.db
        .query("boards")
        .withSearchIndex("search_name", (q) =>
          q.search("name", args.searchTerm!)
            .eq("ownerId", user._id)
            .eq("inTrash", args.showTrashed ?? false)
        );
    }

    if (args.showTrashed !== undefined) {
      boardsQuery = boardsQuery.filter((q) => q.eq(q.field("inTrash"), args.showTrashed));
    }

    return await boardsQuery.paginate(args.paginationOpts);
  },
});

export const updateNotesCount = internalMutation({
  args: { boardId: v.id("boards"), increment: v.number() },
  handler: async (ctx, args) => {
    const { boardId, increment } = args;
    const board = await ctx.db.get(boardId);
    if (!board) throw new Error("Board not found");

    const currentCount = board.notesCount || 0;
    await ctx.db.patch(boardId, { notesCount: currentCount + increment });
  },
});