import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),
    plan: v.optional(v.string()),
    onBoarding: v.optional(v.boolean())
  }).index("by_token", ["tokenIdentifier"]),

  boards: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    isShared: v.boolean(),
    shareCode: v.optional(v.string()),
    notesCount: v.optional(v.number()),
    inTrash: v.boolean(),
    _creationTime: v.number(),
    lastModified: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_owner_and_modified", ["ownerId", "lastModified"])
    .index("by_owner_and_name", ["ownerId", "name"])
    .index("by_owner_and_notes", ["ownerId", "notesCount"])
    .index("by_shareCode", ["shareCode"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["ownerId", "inTrash"]
    }),

  notes: defineTable({
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
    zIndex: v.optional(v.number()),
  }).index("by_board", ["boardId"]),

  presence: defineTable({
    userId: v.id("users"),
    boardId: v.id("boards"),
    lastUpdated: v.number(),
    cursorPosition: v.object({
      x: v.number(),
      y: v.number()
    }),
  }).index("by_board", ["boardId"])
    .index("by_user_and_board", ["userId", "boardId"])
    .index("by_board_and_lastUpdated", ["boardId", "lastUpdated"]),

  supportRequest: defineTable({
    userId: v.id("users"),
    input: v.string()
  }),

  emailLogs: defineTable({
    userId: v.id("users"),
    type: v.string(),
    sentAt: v.number(),
  }).index("by_user_and_type", ["userId", "type"]),
});