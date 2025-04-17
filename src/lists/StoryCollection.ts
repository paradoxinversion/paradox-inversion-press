import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import { text, relationship, select } from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";
import slugify from "../utils/slugify";

const StoryCollection = list({
  access: {
    operation: {
      query: allowAll,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
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
    socialMediaBrief: text({ validation: { isRequired: true } }),
    synopsis: document({
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
    seriesPosts: relationship({ ref: "Post", many: true }),
    url: text({ isIndexed: "unique" }),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
      ui: { displayMode: "segmented-control" },
    }),
  },
});

export default StoryCollection;
