"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <button className="btn btn-sm">Acciones</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
