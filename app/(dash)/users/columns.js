"use client";
import { DialogTrigger } from "@/components/ui/dialog";
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
};

const handleDelete = (row) => {};

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
            <DropdownMenuItem>
              <DialogTrigger
                onClick={() => handleEdit(row)}
                className="cursor-pointer"
              >
                Editar
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger>Eliminar</DialogTrigger>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Ver</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
