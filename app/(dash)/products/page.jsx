import React from "react";
import { getQuery } from "@/actions/query-actions";
import {
  Dialog,
} from "@/components/ui/dialog";
import ProductForms from "./forms";

const PageProducts = async () => {
  var products =[]
  // var roles = []

  const result = await getQuery("product",{
    include: {
      platformProducts: true,
    },
  });
  // console.log(result);
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  products = JSON.stringify(result.data) ;


  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Productos</h1>
      </div>
      <div className="flex flex-col flex-grow container ">
        <Dialog>
           <ProductForms products={products} />
        </Dialog>
      </div>
    </>
  );
};

export default PageProducts;
