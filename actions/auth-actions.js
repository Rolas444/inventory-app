"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const LoginAction = async (data) => {
  console.log("vamos a ejecutarnos");
  try {
    await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    // console.log(result);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: JSON.stringify(e) };
  }
};

export const RegisterAction = async (data) => {
  try {
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
        (account) => account.type === "oauth",
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

   const result = await prisma.user.create({
      data: {
        email: data.email,
        // phone: data.phone,
        roleId: data.roleId,
        name: data.name,
        status: data.status,
        password: passwordHash,
      },
    });
    console.log(result);
    // if(result.data)
    return { success: true, data: result};

  } catch (error) {
    if (error instanceof AuthError) {
      console.log("AuthError", error);
      return { error: error.cause?.err?.message };
    }
    console.log("Error", error);
    return { error: "error 500" };
  }
};

export const AuthLevel = async (idRole) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: idRole,
      },
    });
    return JSON.stringify(role);
  } catch (e) {
    const objError= { error: e };
    return JSON.stringify(objError);
  }
};
