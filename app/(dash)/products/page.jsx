import React from "react";
// import { userColumns } from "./columns";
import { getQuery } from "@/actions/query-actions";
import UserForms from "./forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PageProducts = async () => {
  var products =[]
  // var roles = []

  const result = await getQuery("product");
  // console.log(result);
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  products = result.data ;


  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Productos</h1>
      </div>
      <div className="container py-10">
        <Dialog>
           <UserForms products={products} />
        </Dialog>
      </div>
    </>
  );
};

export default PageProducts;
