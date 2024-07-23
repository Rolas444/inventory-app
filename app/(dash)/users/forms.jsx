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
import FrmRegister from "@/components/frm-auth/frm-register";
import DataTable from "@/components/table/data-table";
import { EllipsisVertical } from "lucide-react";
import { userColumns } from "./columns";

const UserForms = ({ users }) => {
    const { entityName, entityId, action } = useInventoryStore()
    const { setEntityObject } = useInventoryStore();

    const handleEdit = (e, row) => {

        
        setEntityObject('user', row.original.id, 'edit');
    };

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
        <DataTable columns={columns} data={users} />
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{entityName}</DialogTitle>
                <DialogDescription>
                    {entityId}
                </DialogDescription>
            </DialogHeader>

        </DialogContent>
    </>)

}

export default UserForms;