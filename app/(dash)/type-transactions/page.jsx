import React from "react";
// import { userColumns } from "./columns";
import { getQuery } from "@/actions/query-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TypeTransactionForm from "./forms";

const TypeTransactionPage = async () => {
  var typeTransactions =[]
  // var roles = []

  const result = await getQuery("TypeTransaction", {
    where: { status: true },
  });
  // console.log(result);  TypeTransaction
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  typeTransactions = result.data ;


  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{`Tipos de Movimientos (transacciones)`}</h1>
      </div>
      <div className="flex flex-col flex-grow container ">
           <TypeTransactionForm typeTransactions={typeTransactions} />
      </div>
    </>
  );
};

export default TypeTransactionPage;