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
  const users = result.data ;

  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
      </div>
      <div className="container py-10">
        <Dialog>
           <UserForms users={users} />
        </Dialog>
      </div>
    </>
  );
};

export default PageUsers;
