import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const supportRequest = mutation({
  args: { input: v.string() },
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
    await ctx.db.insert('supportRequest', {
      userId: user._id,
      input: args.input,
    })
  },
})