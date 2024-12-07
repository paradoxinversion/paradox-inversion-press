import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  timestamp,
  select,
  password,
  checkbox,
} from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";
const User = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
  fields: {
    username: text({ validation: { isRequired: true } }),
    displayName: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    posts: relationship({ ref: "Post.author", many: true }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({ defaultValue: false }),
  },
  ui: {
    labelField: "username",
  },
});

export default User;
