import React from "react";
import FrmRegister from "@/components/frm-auth/frm-register";
import DataTable from "@/components/table/data-table";
import { userColumns } from "./columns";
import { getQuery } from "@/actions/query-actions";

const PageUsers = async () => {
  const result = await getQuery("user", {
    include: {
      role: true,
    },
  });
  // console.log(result);
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  const users = result.data;

  const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default PageUsers;
