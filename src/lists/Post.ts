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
import slugify from "../utils/slugify";

function filterPosts({ session }: { session?: Session }) {
  // if the user is an Admin, they can access all the records
  if (session?.data.isAdmin) return true;
  // otherwise, filter for published posts
  return { status: { equals: "published" } };
}

const Post = list({
  access: {
    operation: {
      query: allowAll,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    filter: {
      query: filterPosts,
    },
  },
  // access: allowAll,
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { title } = resolvedData;

      if (title) {
        return { ...resolvedData, url: slugify(title) };
      }

      return resolvedData;
    },
  },
  fields: {
    title: text(),
    postType: select({
      options: [
        { label: "Standalone", value: "standalone" },
        { label: "Series", value: "series" },
      ],
      defaultValue: "standalone",
      ui: { displayMode: "segmented-control" },
    }),
    
    publishedAt: timestamp({
      defaultValue: { kind: "now" },
      validation: { isRequired: true },
    }),
    lastModified: timestamp({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
    }),
    author: relationship({
      ref: "User",
      many: false
    }),
    brief: text(),
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
    category: relationship({ ref: "Category" }),
    headerImage: relationship({ ref: "Image" }),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
      ui: { displayMode: "segmented-control" },
    }),
    page: relationship({ ref: "Page", many: true }),
    tags: relationship({ ref: "Tag", many: true }),
    series: relationship({ ref: "StoryCollection" }),
    seriesOrder: integer(),
    url: text({ isIndexed: "unique" }),
  },
});

export default Post;
