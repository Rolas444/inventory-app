// export { auth as middleware } from "@/auth"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server";
 
const { auth } = NextAuth(authConfig);

const publicRoutes = ['/login']
const protectedRoutes = ['/', '/dashboard','/products', '/users' ]

export default auth((req)=>{
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;
  const apiAuthPrefix = "/api/auth";

  if(nextUrl.pathname.startsWith(apiAuthPrefix)){
    return NextResponse.next();
  }

  if(publicRoutes.includes(nextUrl.pathname)){
    return NextResponse.next();
  }
  if(!isLoggedIn){
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };