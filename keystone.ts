import { config, list } from "@keystone-6/core";
import lists from "./src/lists/lists";
import { withAuth, session } from "./auth";
import { TypeInfo } from ".keystone/types";

export default config<TypeInfo>(
  withAuth({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  })
);
