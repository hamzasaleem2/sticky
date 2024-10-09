import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateUser = mutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called createOrUpdateUser without authentication present");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user._id, { 
        name: args.name,
        profileImageUrl: args.profileImageUrl,
      });
      return user._id;
    }

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      tokenIdentifier: args.tokenIdentifier,
      profileImageUrl: args.profileImageUrl,
    });
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("No User Logged in.");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier.split('|')[1]))
      .unique();
    return user;
  }
})

export const storePlan = mutation({
  args: { plan: v.string() },
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

    if(!user.onBoarding){
      await ctx.db.patch(user._id, { plan: args.plan, onBoarding: true });
      return true;
    }
    else{
      return true;
    }
  },
});