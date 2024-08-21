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
import { EllipsisVertical, Loader } from "lucide-react";
import { userColumns } from "./columns";
import { useEffect, useState } from "react";
import { getQuery } from "@/actions/query-actions";
import { AiOutlineLoading } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserForms = ({ users }) => {
    const { entityName, entityId, action, modalOpen, setModalOpen } = useInventoryStore()
    const { setEntityObject } = useInventoryStore();
    const [currentData, setCurrentData] = useState({});
    const [loading, setLoading] = useState(false);

    const fnGetUser = async (id) => {
        const result = await getQuery("user", { where: { id: id, status: true } });
        if (result.error) {
            toast.error('Error al obtener usuario');
        }
        if (result.success) {
            console.log(result);
            setCurrentData(result.data[0]);
        }

    }

    const handleEdit = async (row) => {
        setLoading(true);
        await fnGetUser(row.original.id);
        setEntityObject('user', row.original.id, 'edit');
        setLoading(false);
        setModalOpen(true);
    };

    const handleNew = async () => {
        setEntityObject('user', null, 'new');
        setModalOpen(true);
    }

    const btnNew = () => <DialogTrigger onClick={handleNew}>Nuevo</DialogTrigger>

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
                                onClick={async () => await handleEdit(row)}
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

    // useEffect(()=>{
    //     if(action === 'edit' && entityId){
    //         fnGetUser(entityId);
    //     }
    // },[entityId])

    return (<>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DataTable columns={columns} data={users} btnNew={btnNew} />
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>{action === 'edit' ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-4">
                        {!loading ? <FrmRegister stateForm={action} currentData={currentData} /> : <div className="w-full flex justify-center"><AiOutlineLoading className="mr-2 h-10 w-10 animate-spin" /></div>}
                    </div>
                </div>


            </DialogContent>
        </Dialog>
    </>)

}

export default UserForms;