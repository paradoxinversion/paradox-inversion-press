import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";

const Category = list({
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
  },
});

export default Category;
