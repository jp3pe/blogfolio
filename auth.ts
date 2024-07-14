import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchUserByEmailAndPassword } from "./app/lib/db";
import { createHash } from "crypto";
import { signInSchema } from "@/app/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // TODO: Use safeParseAsync instead of parseAsync
        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to salt and hash password
        const hashedPassword = createHash("sha384")
          .update(password)
          .digest("hex");

        // logic to verify if user exists
        user = await fetchUserByEmailAndPassword(email, hashedPassword);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
});
