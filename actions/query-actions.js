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
  // console.log(param);
  try {
    const result = param
      ? await prisma[enityName].findMany(param)
      : await prisma[enityName].findMany();
    // console.log(result);
    const formattedResult = result.map(item => ({
      ...item,
      createdAt: item.createdAt ? item.createdAt.toLocaleString() : null,
      updatedAt: item.updatedAt ? item.updatedAt.toLocaleString() : null,
    }));
    return { success: true, data: formattedResult };

  } catch (e) {
    console.log(e);
    return { error: JSON.stringify(e.message) };
  }
};

export const createQuery = async (enityName, data) => {
  console.log(data)
  try {
    const result = await prisma[enityName].create({ data });
    const objresult = { success: true, data: result };
    return JSON.stringify(objresult);
  } catch (e) {
    // console.log(e);
    const objError= { error: e.message };
    return JSON.stringify(objError);
  }
};

export const groupByQuery = async (enityName, groupByParams ) => {
  try{
    const result =  await prisma[enityName].groupBy(groupByParams);
    console.log(result)
    return { success: true, data: result };
    // return JSON.stringify(objresult);
  }catch(e){
    const objError= { error: e.message };
    return JSON.stringify(objError);
  }
}

export const updateQuery = async (enityName, where, data) => {
  try {
    const result = await prisma[enityName].update({ where, data });
    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};

export const UpdateStocks = async (data) => {
  try {
    var opNumber = data.type ==="I"? data.quantity : -data.quantity;
    const result = await prisma.product.update({
      where: { id: data.productId },
      data: { stock: {
        increment: opNumber
      } },
    });
    console.log(result);

    const platformProduct = await prisma.platformProduct.findFirst({
      where: {
        productId: data.productId,
        platformId: data.platformId,
      },
    }); 

    if (platformProduct) {
      console.log(platformProduct);
      const result2 = await prisma.platformProduct.update({
        where: { id: platformProduct.id },
        data: { quantity: {
          increment: opNumber
        } },
      });
      console.log(result2);

    }

    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
