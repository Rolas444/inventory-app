import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"

const db = prisma

export const { handlers, auth, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig,
    callbacks:{
      jwt({token,user}){
        if(user){
          token.role = user.role
        }
        return token;
      },
      session({session, token}){
        if(session.user){
          session.user.role = token.role;
        }
        return session;
      },
    }
  })