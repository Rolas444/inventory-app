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
import DataTable from "@/components/table/data-table";
import { EllipsisVertical } from "lucide-react";
import { productColumns } from "./columns";
import { useEffect, useState } from "react";
import { AuthLevel } from "@/actions/auth-actions";
import FrmRegisterProducts from "@/components/frms/frm-register-products";

const ProductForms = ({ products }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const { entityName, entityId, action, session } = useInventoryStore()

    const { setEntityObject } = useInventoryStore();

    const handleEdit = (e, row) => {

        setEntityObject('user', row.original.id, 'edit');
    };

    const handleNew = () => {
        setEntityObject('user', null, 'new');

    }

    const getAuth = async () => {
        // const datatSession = 
        const Level = await AuthLevel(session?.user.roleId);
        const objLevel = JSON.parse(Level);
        if (objLevel.name === 'admin') {
            setIsAdmin(true);
        }

    }

    const btnNew = () => {
        return isAdmin ? <DialogTrigger onClick={handleNew}>Nuevo</DialogTrigger> : <></>
    }

    const authColumns =()=> isAdmin ? productColumns :  productColumns.filter(col=>col.accessorKey !== 'wholesale')


    const columns = [...authColumns(),
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

    useEffect(() => {
        getAuth()
    }, [session])

    return (<>
        <DataTable columns={columns} data={JSON.parse(products)} btnNew={btnNew} />
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{action === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <FrmRegisterProducts stateForm={action} />
                </div>
            </div>


        </DialogContent>
    </>)

}

export default ProductForms;