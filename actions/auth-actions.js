'use server'

import { signIn } from "@/auth"
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const LoginAction = async (data)=>{
    try {
        await signIn('credentials', {
            redirect: false,
            username: data.username,
            password: data.password,
        })
    }catch(e){
        console.log(e);
    }
}

export const RegisterAction = async (data)=>{
    
    try{
         // verificar si el usuario ya existe
     const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        include: {
          accounts: true, // Incluir las cuentas asociadas
        },
      });

      if (user) {
        // Verificar si tiene cuentas OAuth vinculadas
        const oauthAccounts = user.accounts.filter(
          (account) => account.type === "oauth"
        );
        if (oauthAccounts.length > 0) {
          return {
            error:
              "To confirm your identity, sign in with the same account you used originally.",
          };
        }
        return {
          error: "User already exists",
        };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);

      await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: passwordHash,
        },
      })

      return {success: true}
    } catch(error){
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
          }
          return { error: "error 500" };
    }
}