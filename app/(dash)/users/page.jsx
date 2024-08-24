import React from "react";
// import { userColumns } from "./columns";
import { getQuery } from "@/actions/query-actions";
import UserForms from "./forms";

const PageUsers = async () => {
  var users =[]
  // var roles = []

  const result = await getQuery("user", {
    where: { status: true },
    include: {
      role: true,
    },
  });
  // console.log(result);
  if (result.error) {
    return <div>No se encontraron registros</div>;
  }
  users = result.data ;


  // const columns = userColumns;

  return (
    <>
      <div className="flex items-center container">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
      </div>
      <div className="flex flex-col flex-grow ">
           <UserForms users={users} />
      </div>
    </>
  );
};

export default PageUsers;
