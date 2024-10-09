import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const shareBoard = mutation({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    if (board.isShared && board.shareCode) {
      return board.shareCode;
    }

    const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    await ctx.db.patch(args.boardId, { isShared: true, shareCode });
    return shareCode;
  },
});

  export const getSharedBoardId = query({
    args: { shareCode: v.string() },
    handler: async (ctx, args) => {
      const board = await ctx.db
        .query("boards")
        .withIndex("by_shareCode", (q) => q.eq("shareCode", args.shareCode))
        .first();
      return board && board.isShared ? board._id : null;
    },
  });

  export const toggleBoardSharing = mutation({
    args: { boardId: v.id("boards") },
    handler: async (ctx, args) => {
      const board = await ctx.db.get(args.boardId);
      if (!board) throw new Error("Board not found");
  
      const isShared = !board.isShared;
      await ctx.db.patch(args.boardId, { isShared });
  
      if (!isShared) {
        await ctx.db.patch(args.boardId, { shareCode: undefined });
      } else if (!board.shareCode) {
        const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        await ctx.db.patch(args.boardId, { shareCode });
      }
  
      return isShared;
    },
  });