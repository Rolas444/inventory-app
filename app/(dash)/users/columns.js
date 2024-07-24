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
import {useInventoryStore} from "@/zustand/store";

import { EllipsisVertical } from "lucide-react";

const handleEdit = (e, row) => {
  const {setEntityObject} = useInventoryStore();
  setEntityObject('user', row.original.id, 'edit');
};

// const handleDelete = (row) => {};

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
  }
];
