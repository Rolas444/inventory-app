import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/db"
import bcrypt from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   email: {},
      //   password: {},
      // },
      authorize: async (credentials) => {
        // console.log({ credentials })
        // let user = null
        // if(credentials.username !== "mail@test.com"){
        //   throw new Error("User not found.")
        // }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username as string,
          },
        });
        if(!user){
          throw new Error("User not found.")
        }
        
        const isValid = bcrypt.compare(credentials.password as string, user.password as string);
        if(!isValid){
          throw new Error("Invalid password.")
        }
        // return user object with the their profile data
        // return user
        return user
      },
    }),
  ],
} satisfies NextAuthConfig