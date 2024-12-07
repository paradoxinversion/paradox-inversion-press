import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  timestamp,
  select,
  password,
} from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";

const Tag = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    description: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    posts: relationship({ ref: "Post", many: true }),
  },
});

export default Tag;
