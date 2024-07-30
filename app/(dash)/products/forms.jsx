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
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { AuthLevel } from "@/actions/auth-actions";
import FrmRegisterProducts from "@/components/frms/frm-register-products";

const ProductForms = ({ products }) => {

    const [isAdmim, setIsAdmin] = useState(false);
    const { entityName, entityId, action, session } = useInventoryStore()

    const { setEntityObject } = useInventoryStore();

    const handleEdit = (e, row) => {

        setEntityObject('user', row.original.id, 'edit');
    };

    const handleNew = () => {
        setEntityObject('user', null, 'new');

    }

    const getAuth = async ()=>{
        // const datatSession = 
        const Level = await AuthLevel(session?.user.roleId);
        if (Level.name === 'admin') {
            setIsAdmin(true);
        }

    }

    const btnNew =()=> {

    return isAdmim? <DialogTrigger onClick={handleNew}>Nuevo</DialogTrigger>: <></>
}
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
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    ];

    useEffect(()=>{
        getAuth()
    },[])

    return (<>
        <DataTable columns={columns} data={products} btnNew={btnNew} />
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{action === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <FrmRegisterProducts stateForm={action}  />
                </div>
            </div>


        </DialogContent>
    </>)

}

export default ProductForms;