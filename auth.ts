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
        user_name: {},
      },
      authorize: async (credentials) => {
        let user = { id: '', name: '', email: '', image: '' }

        // TODO: Use safeParseAsync instead of parseAsync
        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to salt and hash password
        const hashedPassword = createHash("sha384")
          .update(password)
          .digest("hex");

        // logic to verify if user exists
        // user = await fetchUserByEmailAndPassword(email, hashedPassword);
        // TODO: Do not use temp variable.
        const tempUser = await fetchUserByEmailAndPassword(email, hashedPassword); 
        user.email = tempUser.email;
        user.id = tempUser.user_id;
        user.name = tempUser.user_name;

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
