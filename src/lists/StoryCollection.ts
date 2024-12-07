import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import { text, relationship } from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";

const StoryCollection = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
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
  },
});

export default StoryCollection;
