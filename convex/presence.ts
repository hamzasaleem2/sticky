import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updatePresence = mutation({
  args: { 
    boardId: v.id("boards"),
    cursorPosition: v.object({
      x: v.number(),
      y: v.number()
    }),
    isHeartbeat: v.boolean()
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

    const now = Date.now();
    const existingPresence = await ctx.db
      .query("presence")
      .withIndex("by_user_and_board", (q) => 
        q.eq("userId", user._id).eq("boardId", args.boardId)
      )
      .first();

    if (existingPresence) {
      await ctx.db.patch(existingPresence._id, {
        lastUpdated: now,
        cursorPosition: args.isHeartbeat ? existingPresence.cursorPosition : args.cursorPosition
      });
    } else {
      await ctx.db.insert("presence", {
        userId: user._id,
        boardId: args.boardId,
        lastUpdated: now,
        cursorPosition: args.cursorPosition
      });
    }
  },
});

export const getActiveUsers = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const thirtySecondsAgo = Date.now() - 30000;
    const activePresence = await ctx.db
      .query("presence")
      .withIndex("by_board_and_lastUpdated", (q) => 
        q.eq("boardId", args.boardId)
         .gte("lastUpdated", thirtySecondsAgo)
      )
      .collect();

    const userIds = [...new Set(activePresence.map((p) => p.userId))];
    const users = await Promise.all(
      userIds.map(async (userId) => {
        const user = await ctx.db.get(userId);
        const presence = activePresence.find(p => p.userId === userId);
        if (user && presence) {
          return {
            _id: user._id,
            name: user.name,
            profileImageUrl: user.profileImageUrl,
            cursorPosition: presence.cursorPosition
          };
        }
        return null;
      })
    );

    return users.filter((user): user is NonNullable<typeof user> => user !== null);
  },
});

export const removePresence = mutation({
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

    const presence = await ctx.db
      .query("presence")
      .withIndex("by_user_and_board", (q) => 
        q.eq("userId", user._id).eq("boardId", args.boardId)
      )
      .first();

    if (presence) {
      await ctx.db.delete(presence._id);
    }
  },
});