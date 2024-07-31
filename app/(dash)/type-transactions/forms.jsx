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
import FrmRegister from "@/components/frms/frm-register";
import DataTable from "@/components/table/data-table";
import { EllipsisVertical } from "lucide-react";
import { userColumns } from "./columns";

const TypeTransactionForm = ({ typeTransactions }) => {
    const { entityName, entityId, action } = useInventoryStore()
    const { setEntityObject } = useInventoryStore();

    const handleEdit = (e, row) => {

        setEntityObject('TypeTransaction', row.original.id, 'edit');
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
                <div className="grid grid-cols-4 items-center gap-4">
                    <FrmRegister stateForm={action}  />
                </div>
            </div>


        </DialogContent>
    </>)

}

export default TypeTransactionForm;