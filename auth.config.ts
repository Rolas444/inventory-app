import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
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
        console.log({ credentials })
        let user = null
        if(credentials.email !== "mail@test.com"){
          throw new Error("User not found.")
        }
        // const pwHash = saltAndHashPassword(credentials.password)
 
        // user = await getUserFromDb(credentials.email, pwHash)
 
        // if (!user) {
        //   throw new Error("User not found.")
        // }
 
        // return user object with the their profile data
        // return user
        return {
          id: "1",
          name: "Test User",
          email: "mail@test.com"
        }
      },
    }),
  ],
} satisfies NextAuthConfig