"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const initValues = async () => {
  try {
    const rolesDB = await prisma.role.findMany();
    const usersDB = await prisma.user.findMany();

    if (rolesDB.length > 0 && usersDB.length > 0) {
      return { success: true };
    }

    if (rolesDB.length < 1) {
      const roles = [{ name: "admin" }, { name: "user" }];

      roles.map(async (role) => {
        const result = await prisma.role.create({ data: role });
        console.log(result);
      });
    }
    //create first admin
    const roleAdmin = await prisma.role.findFirst({ where: { name: "admin" } });
    console.log(roleAdmin);

    if (roleAdmin) {
      const admin = {
        email: "7200ws@gmail.com",
        password: await bcrypt.hash("123456", 10),
        roleId: roleAdmin.id,
        name: "admin",
      };

      const result = await prisma.user.create({ data: admin });
      console.log(result);
    }
    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};

export const getQuery = async (enityName, param = null) => {
  console.log(param);
  try {
    const result = param
      ? await prisma[enityName].findMany(param)
      : await prisma[enityName].findMany();
    // console.log(result);
    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { error: e.message};
  }
};

export const createQuery = async (enityName, data) => {
  console.log(data)
  try {
    const result = await prisma[enityName].create({ data });
    const objresult = { success: true, data: result };
    return JSON.stringify(objresult);
  } catch (e) {
    console.log(e);
    const objError= { error: e };
    return JSON.stringify(objError);
  }
};

export const updateQuery = async (enityName, where, data) => {
  try {
    const result = await prisma[enityName].update({ where, data });
    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};
