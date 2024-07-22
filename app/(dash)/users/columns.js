"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical } from "lucide-react";

const handleEdit = (row) => {
  console.log(row);
}

const handleDelete = (row) => {

}

export const userColumns = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Celular",
    accessorKey: "phone",
  },
  {
    header: "correo",
    accessorKey: "email",
  },
  {
    header: "Estado",
    accessorKey: "status",
  },
  {
    header: "Rol",
    accessorKey: "role.name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* <button className="btn btn-sm"> */}
            <EllipsisVertical />
            {/* </button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem ><div onClick={()=>handleEdit(row)} className="cursor-pointer">
              Editar
              </div></DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Ver</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
