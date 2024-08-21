'use client'
import { useInventoryStore } from "@/zustand/store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FrmTypeTransactions from "@/components/frms/frm-type-transactions";
import DataTable from "@/components/table/data-table";
import { EllipsisVertical } from "lucide-react";
import { userColumns } from "./columns";
import { useState } from "react";
import { getQuery } from "@/actions/query-actions";
import { AiOutlineLoading } from "react-icons/ai";

const TypeTransactionForm = ({ typeTransactions }) => {
    const [loading, setLoading] = useState(false);
    const { entityName, entityId, action } = useInventoryStore()
    const [currentData, setCurrentData] = useState({});
    const { setEntityObject } = useInventoryStore();


    const fnGetTransaction = async (id) => {
        const result = await getQuery("TypeTransaction", {where: {id: id, status: true}});
        if (result.error) {
            toast.error('Error al obtener usuario');
        }
        if(result.success){
            console.log(result);
            setCurrentData(result.data[0]);
        }
        
    }

    const handleEdit = async (e, row) => {
        setLoading(true);
        await fnGetTransaction(row.original.id);
        setEntityObject('TypeTransaction', row.original.id, 'edit');
        setLoading(false);
    };

    const handleNew = () => {
        setEntityObject('user', null, 'new');

    }

    const btnNew =()=> <DialogTrigger onClick={handleNew}>Nuevo</DialogTrigger>

    const columns = [...userColumns,
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
                                onClick={(e) => handleEdit(e, row)}
                                className="cursor-pointer"
                            >
                                Editar
                            </DialogTrigger>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                    <DialogTrigger>Eliminar</DialogTrigger>
                  </DropdownMenuItem> */}
                        {/* <DropdownMenuSeparator />
                  <DropdownMenuItem>Ver</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    ];

    return (<>
        <DataTable columns={columns} data={typeTransactions} btnNew={btnNew} />
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{action === 'edit' ? 'Editar Movimiento' : 'Nuevo Movimiento'}</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid  gap-4">
                    {!loading ? <FrmTypeTransactions stateForm={action} currentData={currentData} />
                    : <div className="w-full flex justify-center"><AiOutlineLoading  className="mr-2 h-10 w-10 animate-spin" /></div>}
                </div>
            </div>


        </DialogContent>
    </>)

}

export default TypeTransactionForm;