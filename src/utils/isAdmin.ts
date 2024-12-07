import { Session } from "../types";

const isAdmin = ({ session }: { session?: Session }) =>
  Boolean(session?.data.isAdmin);

export default isAdmin;
