import React from "react";
import FrmRegister from "@/components/frm-auth/frm-register";
import DataTable from "@/components/table/data-table";
import { userColumns } from "./columns";
import { getQuery } from "@/actions/query-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <div className="container py-10">
        <Dialog>
          <DataTable columns={columns} data={users} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PageUsers;
