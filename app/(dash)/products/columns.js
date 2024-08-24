'use client'
import { GetUrlBucketSupabase } from '@/lib/tools';
import {CiImageOn} from 'react-icons/ci'

export const productColumns = [
    {
      header: "Nombre",
      accessorKey: "name",
      size: 100,
      minSize: 100,
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
          <div className={`flex justify-center font-bold ${row.original.stock <2 && ' text-red-600'} `}>
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
              {row.original.image ? <><img src={GetUrlBucketSupabase(row.original.image)} alt={row.original.image} className='h-[60px]'  /></>:<><CiImageOn  className="text-cyan-800 w-[60px] h-[60px] align-center"/></>}
            </div>
          );
        },
    }
  ];
  