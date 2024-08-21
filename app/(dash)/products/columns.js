'use client'
import { GetUrlBucketSupabase } from '@/lib/tools';
import {CiImageOn} from 'react-icons/ci'

export const productColumns = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "SKU",
      accessorKey: "sku",
    },
    // {
    //   header: "Estado",
    //   accessorKey: "status",
    // },
    {
      header: "Stock",
      accessorKey: "stock",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center font-bold">
            {row.original.stock}
          </div>
        );
      },
    },
    {
      header: "Precio",
      accessorKey: "price",
    },
    {
      header: "Costo",
      accessorKey: "cost",
    },
    {
      header: "P x Mayor",
      accessorKey: "wholesale",
    },
    {
        header: "imagen",
        accessorKey: "image",
        cell: ({ row }) => {
          return (
            <div className="flex justify-center">
              {row.original.image ? <><img src={GetUrlBucketSupabase(row.original.image)} alt={row.original.image} className='h-6'  /></>:<><CiImageOn  className="text-cyan-800 w-6 h-6 align-center"/></>}
            </div>
          );
        },
    }
  ];
  