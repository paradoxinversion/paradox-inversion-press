import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  timestamp,
  select,
  integer,
} from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";
import { Session } from "../types";

function filterPosts({ session }: { session?: Session }) {
  // if the user is an Admin, they can access all the records
  if (session?.data.isAdmin) return true;
  // otherwise, filter for published posts
  return { status: { equals: "published" } };
}

const Post = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    filter: {
      query: filterPosts,
    },
  },
  fields: {
    title: text(),
    category: relationship({ ref: "Category" }),
    series: relationship({ ref: "StoryCollection" }),
    seriesOrder: integer(),
    publishedAt: timestamp(),
    author: relationship({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["displayName", "email"],
        inlineEdit: { fields: ["displayName", "email"] },
        linkToItem: true,
        inlineCreate: { fields: ["displayName", "email"] },
      },
    }),
    page: relationship({ ref: "Page" }),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
      ui: { displayMode: "segmented-control" },
    }),
    content: document({
      formatting: true,
      links: true,
      dividers: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
    }),
    tags: relationship({ ref: "Tag", many: true }),
  },
});

export default Post;
