/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as boardSharing from "../boardSharing.js";
import type * as boards from "../boards.js";
import type * as emails from "../emails.js";
import type * as notes from "../notes.js";
import type * as presence from "../presence.js";
import type * as support from "../support.js";
import type * as users from "../users.js";
import type * as welcomeEmail from "../welcomeEmail.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  boardSharing: typeof boardSharing;
  boards: typeof boards;
  emails: typeof emails;
  notes: typeof notes;
  presence: typeof presence;
  support: typeof support;
  users: typeof users;
  welcomeEmail: typeof welcomeEmail;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  aggregateBoardsByUser: {
    btree: {
      aggregateBetween: FunctionReference<
        "query",
        "internal",
        { k1?: any; k2?: any },
        { count: number; sum: number }
      >;
      atNegativeOffset: FunctionReference<
        "query",
        "internal",
        { k1?: any; k2?: any; offset: number },
        { k: any; s: number; v: any }
      >;
      atOffset: FunctionReference<
        "query",
        "internal",
        { k1?: any; k2?: any; offset: number },
        { k: any; s: number; v: any }
      >;
      count: FunctionReference<"query", "internal", {}, any>;
      get: FunctionReference<
        "query",
        "internal",
        { key: any },
        null | { k: any; s: number; v: any }
      >;
      offset: FunctionReference<
        "query",
        "internal",
        { k1?: any; key: any },
        number
      >;
      offsetUntil: FunctionReference<
        "query",
        "internal",
        { k2?: any; key: any },
        number
      >;
      paginate: FunctionReference<
        "query",
        "internal",
        {
          cursor?: string;
          k1?: any;
          k2?: any;
          limit: number;
          order: "asc" | "desc";
        },
        {
          cursor: string;
          isDone: boolean;
          page: Array<{ k: any; s: number; v: any }>;
        }
      >;
      sum: FunctionReference<"query", "internal", {}, number>;
      validate: FunctionReference<"query", "internal", {}, any>;
    };
    inspect: {
      display: FunctionReference<"query", "internal", {}, any>;
      dump: FunctionReference<"query", "internal", {}, string>;
      inspectNode: FunctionReference<
        "query",
        "internal",
        { node?: string },
        null
      >;
    };
    public: {
      clear: FunctionReference<
        "mutation",
        "internal",
        { maxNodeSize?: number; rootLazy?: boolean },
        null
      >;
      deleteIfExists: FunctionReference<
        "mutation",
        "internal",
        { key: any },
        any
      >;
      delete_: FunctionReference<"mutation", "internal", { key: any }, null>;
      init: FunctionReference<
        "mutation",
        "internal",
        { maxNodeSize?: number; rootLazy?: boolean },
        null
      >;
      insert: FunctionReference<
        "mutation",
        "internal",
        { key: any; summand?: number; value: any },
        null
      >;
      makeRootLazy: FunctionReference<"mutation", "internal", {}, null>;
      replace: FunctionReference<
        "mutation",
        "internal",
        { currentKey: any; newKey: any; summand?: number; value: any },
        null
      >;
      replaceOrInsert: FunctionReference<
        "mutation",
        "internal",
        { currentKey: any; newKey: any; summand?: number; value: any },
        any
      >;
    };
  };
};

/* prettier-ignore-end */
