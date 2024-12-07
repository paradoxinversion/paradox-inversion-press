import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  timestamp,
  image,
  password,
} from "@keystone-6/core/fields";
import isAdmin from "../utils/isAdmin";

const Image = list({
  access: {
    operation: {
      query: isAdmin,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    altText: text(),
    image: image({ storage: "local_images" }),
  },
});

export default Image;
