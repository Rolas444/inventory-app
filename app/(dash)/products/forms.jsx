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
import { AiOutlineLoading } from "react-icons/ai";
import { getQuery } from "@/actions/query-actions";

const ProductForms = ({ products }) => {

    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { entityName, entityId, action, session } = useInventoryStore()
    const [currentData, setCurrentData] = useState({});

    const { setEntityObject } = useInventoryStore();

    const handleEdit = async (e, row) => {
        setLoading(true);
        await fnGetProduct(row.original.id);
        setEntityObject('Product', row.original.id, 'edit');
        setLoading(false);
    };

    const handleNew = () => {
        setEntityObject('Product', null, 'new');

    }

    const fnGetProduct = async (id) => {
        const result = await getQuery("Product", {where: {id: id}});
        if (result.error) {
            toast.error('Error al obtener Producto');
        }
        if(result.success){
            console.log(result);
            setCurrentData(result.data[0]);
        }
        
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
        <DialogContent className="w-full">
            <DialogHeader>
                <DialogTitle>{action === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-4">
                    {!loading ? <FrmRegisterProducts stateForm={action} currentData={currentData} />
                    : <div className="w-full flex justify-center"><AiOutlineLoading  className="mr-2 h-10 w-10 animate-spin" /></div>}
                </div>
            </div>


        </DialogContent>
    </>)

}

export default ProductForms;