'use client'
import BoolMask from "@/components/table/bool-mask";

export const userColumns = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Descripción",
      accessorKey: "description",
    },
    {
      header: "Tienda",
      accessorKey: "platform",
      cell: ({ row }) => {
        return (
          <BoolMask value={row.original.platform} />
        );
      },
    },
    // {
    //   header: "Estado",
    //   accessorKey: "status",
    // },
    {
      header: "Visible en Tabla",
      accessorKey: "visible",
      cell: ({ row }) => {
        return (
          <BoolMask value={row.original.visible} />
        );
      },
    }
  ];
  