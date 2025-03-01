import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  sessionData: "username isAdmin",
  secretField: "password",
  initFirstItem: {
    fields: ["username", "displayName", "email", "password"],
    itemData: { isAdmin: true },
    skipKeystoneWelcome: true,
  },
});

let sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
let sessionMaxAge = 60 * 60 * 24; // 24 hours

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { withAuth, session };
