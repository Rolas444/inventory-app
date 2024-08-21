import React from "react";
import { getQuery } from "@/actions/query-actions";
import {
  Dialog,
} from "@/components/ui/dialog";
import ProductForms from "./forms";
import { AuthLevel } from "@/actions/auth-actions";
import { auth } from "@/auth";

const PageProducts = async () => {
  var products = []
  const session = await auth();
  const result = await getQuery("product", {
    where: { status: true },
    include: {
      platformProducts: true,
    },
  });

  const fnIsAdmin = async () => {
    // const datatSession = 
    const Level = await AuthLevel(session?.user.roleId);
    const objLevel = JSON.parse(Level);

    if (objLevel.name === 'admin') {
      return true;
    }

    return false;
  }

  const isAdmin = await fnIsAdmin();

  // console.log(result);
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  products = JSON.stringify(result.data);


  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Productos</h1>
      </div>
      <div className="flex flex-col flex-grow container ">
        <ProductForms products={products} isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default PageProducts;
