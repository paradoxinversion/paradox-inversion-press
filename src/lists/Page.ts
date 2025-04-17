import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  select,
  integer,
  checkbox,
} from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";
import { Session } from "../types";
import slugify from "../utils/slugify";

function filterPages({ session }: { session?: Session }) {
  // if the user is an Admin, they can access all the records
  if (session?.data.isAdmin) return true;
  // otherwise, filter for published posts
  return { status: { equals: "published" } };
}

const Page = list({
  access: {
    operation: {
      query: allowAll,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    filter: {
      query: filterPages,
    },
  },
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
    title: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    pageOrder: integer(),
    pageType: select({
      options: [
        { label: "Home", value: "home" },
        { label: "Standard", value: "standard" },
        { label: "Series", value: "series" },
      ],
      defaultValue: "standard",
      ui: { displayMode: "segmented-control" },
    }),
    socialMediaBrief: text(),
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
    barcode: text(),
    postSections: text(),
    status: select({
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      ui: { displayMode: "segmented-control" },
    }),
    showInNav: checkbox({ defaultValue: false }),
    url: text({ isIndexed: "unique" }),
    storyCollection: relationship({ ref: "StoryCollection" }),
  },
});

export default Page;
