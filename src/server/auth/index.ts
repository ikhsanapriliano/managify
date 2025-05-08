import NextAuth from "next-auth";

import { authConfig } from "./config";

const { handlers, auth } = NextAuth(authConfig);

export { handlers, auth };
