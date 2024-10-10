import { internal } from "./_generated/api";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
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

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      tokenIdentifier: args.tokenIdentifier,
      profileImageUrl: args.profileImageUrl,
    });

     if (args.email) {
      await ctx.scheduler.runAfter(0, internal.emails.sendWelcomeEmail, {
        userId: userId,
        email: args.email,
        name: args.name
      });
    }

    return userId;
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

export const existingLogforEmail = internalQuery({
  args: {
    userId: v.id("users")
  },
  handler: async(ctx,args)=>{
    const existingLog = await ctx.db
    .query("emailLogs")
    .withIndex("by_user_and_type", (q) => 
      q.eq("userId", args.userId).eq("type", "welcome")
    )
    .first();

    if (existingLog) {
      return true;
    }
    return false;
  }
})

export const LogEmailSend = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    try{
      const res = await ctx.db.insert("emailLogs", {
        userId: args.userId,
        type: args.type,
        sentAt: Date.now()
      });
      return res;
    }
    catch(error){
      return error;
    }
  }
})

export const backfillWelcomeEmails = internalMutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      const emailSent = await ctx.db
        .query("emailLogs")
        .withIndex("by_user_and_type", (q) => 
          q.eq("userId", user._id).eq("type", "welcome")
        )
        .first();
      
      if (!emailSent && user.email) {
        await ctx.scheduler.runAfter(0, internal.emails.sendWelcomeEmail, {
          userId: user._id,
          email: user.email,
          name: user.name
        });
      }
    }
  },
});