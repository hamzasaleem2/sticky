import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const createNote = mutation({
  args: {
    boardId: v.id("boards"),
    content: v.string(),
    color: v.string(),
    position: v.object({
      x: v.number(),
      y: v.number(),
    }),
    size: v.object({
      width: v.number(),
      height: v.number(),
    }),
    zIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", args);
    await ctx.runMutation(internal.boards.updateNotesCount, { boardId: args.boardId, increment: 1 });
    await ctx.db.patch(args.boardId, { lastModified: Date.now() });
    return noteId;
  },
});

export const updateNote = mutation({
  args: {
    noteId: v.id("notes"),
    content: v.optional(v.string()),
    color: v.optional(v.string()),
    position: v.optional(v.object({
      x: v.number(),
      y: v.number(),
    })),
    size: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
    zIndex: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { noteId, ...updates } = args;
    const note = await ctx.db.get(noteId);
    if (!note) throw new Error("Note not found");

    await ctx.db.patch(noteId, updates);
    
    await ctx.db.patch(note.boardId, { lastModified: Date.now() });
  },
});

export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");
    
    await ctx.db.delete(args.noteId);
    await ctx.runMutation(internal.boards.updateNotesCount, { boardId: note.boardId, increment: -1 });
    await ctx.db.patch(note.boardId, { lastModified: Date.now() });
  },
});

export const getNotes = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();
  },
});