import { config, list } from "@keystone-6/core";
import lists from "./src/lists/lists";
import { withAuth, session } from "./auth";
import { TypeInfo } from ".keystone/types";
import dotenv from 'dotenv';
import { DatabaseProvider } from "@keystone-6/core/types";

dotenv.config();

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const uiBasePath = process.env.UI_BASE_PATH;
const provider = dbuser && dbpassword ? "mysql" as DatabaseProvider : "sqlite" as DatabaseProvider;
console.log(`Using database provider: ${provider}`);
const url = dbuser && dbpassword
  ? `mysql://${dbuser}:${dbpassword}@${process.env.DB_HOST}:3306/keystone`
  : "file:./keystone.db";
console.log(`Using database URL: ${url}`);
console.log(`Using UI base path: ${!!uiBasePath ? uiBasePath : "default (/)"}`);
export default config<TypeInfo>(
  withAuth({
    server: {
      cors: { origin: ['http://localhost:3001'], credentials: true },
       extendExpressApp: (app) => {
        app.set('trust proxy', 1);
        app.get('/api/status', async (req, res) => {
          res.json("Keystone is running");
        });
      },
    },
    db: {
      provider,
      url,
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
      basePath: uiBasePath,
    },
    storage: {
      local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
    
  })
);
