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
import { useEffect, useState } from "react";
import { getQuery } from "@/actions/query-actions";

const UserForms = ({ users }) => {
    const { entityName, entityId, action } = useInventoryStore()
    const { setEntityObject } = useInventoryStore();
    const [currentData, setCurrentData] = useState({});

    const fnGetUser = async (id) => {
        const result = await getQuery("user", {where: {id: id}});
        if (result.error) {
            toast.error('Error al obtener usuario');
        }
        if(result.success){
            console.log(result);
            setCurrentData(result.data[0]);
        }
        
    }

    const handleEdit = (e, row) => {

        setEntityObject('user', row.original.id, 'edit');
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

    useEffect(()=>{
        if(action === 'edit' && entityId){
            fnGetUser(entityId);
        }
    },[action, entityId])

    return (<>
        <DataTable columns={columns} data={users} btnNew={btnNew} />
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{action === 'edit' ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <FrmRegister stateForm={action} currentData={currentData} />
                </div>
            </div>


        </DialogContent>
    </>)

}

export default UserForms;