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
import { EllipsisVertical, View } from "lucide-react";
import { productColumns } from "./columns";
import { useEffect, useState } from "react";
import { AuthLevel } from "@/actions/auth-actions";
import FrmRegisterProducts from "@/components/frms/frm-register-products";
import FrmAddTransaction from "@/components/frms/frm-add-transaction";
import FrmAddPlatform from "@/components/frms/frm-add-platform";
import ViewHistry from "@/components/frms/view-history";
import { AiOutlineLoading } from "react-icons/ai";
import { getQuery } from "@/actions/query-actions";
import { platform } from "os";
import { select } from "@nextui-org/theme";

const ProductForms = ({ products , isAdmin, userId}) => {

    const [loading, setLoading] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(false);
    const [platformColumns, setPlatformColumns] = useState([]);
    const { entityName, entityId, action, session } = useInventoryStore()
    const [currentData, setCurrentData] = useState({});
    const [frmAction, setFrmAction] = useState('register');
    // const [userId, setUserId] = useState(null);

    const { setEntityObject, modalOpen, setModalOpen } = useInventoryStore();

    // console.log(products);

    const handleEdit = async (e, row) => {
        setLoading(true);
        await fnGetProduct(row.original.id);
        setEntityObject('Product', row.original.id, 'edit');
        setModalOpen(true);
        setLoading(false);
    };

    const handleNew = () => {
        setEntityObject('Product', null, 'new');
        setModalOpen(true);
    }

    const handleAddTransaction = async (row) => {
        setLoading(true);
        await fnGetProduct(row.original.id);
        setEntityObject('Product', row.original.id, 'addTransaction');
        setModalOpen(true);
        setLoading(false);
    }

    const handleAddPlatform = async (row) => {
        setLoading(true);
        await fnGetProduct(row.original.id);
        setEntityObject('Product', row.original.id, 'addPlatform');
        setModalOpen(true);
        setLoading(false);
    }

    const handleViewHistory = async (row) => {
        setLoading(true);
        await fnGetProduct(row.original.id);
        setEntityObject('Product', row.original.id, 'history');
        setModalOpen(true);
        setLoading(false);
    }

    const fnGetProduct = async (id) => {
        const result = await getQuery("Product", { where: { id: id } });
        if (result.error) {
            toast.error('Error al obtener Producto');
        }
        if (result.success) {
            // console.log(result);
            setCurrentData(result.data[0]);
        }

    }

   

    const fnGetPlatforms = async () => {
        const result = await getQuery('TypeTransaction', {
            where: {
                platform: true,
                visible: true,
                status: true
            }
        })
        // console.log(result);
        if (result.error) {
            toast.error('Error al obtener plataformas');
        }
        if (result.success) {

            setPlatformColumns(result.data);
        }
    }

    const titleForm = () => {
        switch (action) {
            case 'new':
                return 'Registro de Productos'
            case 'edit':
                return 'Editar Producto'
            case 'addTransaction':
                return 'Registro de Movimientos'
            case 'addPlatform':
                return 'Registro de Plataforma'
            case 'history':
                return 'Historial de movimientos'
            default:
                return 'Registro de Productos'
        }
    }

    const managerForm = () => {
        switch (action) {
            case 'new':
                return <FrmRegisterProducts stateForm={action} currentData={currentData} />
            case 'edit':
                return <FrmRegisterProducts stateForm={action} currentData={currentData} />
            case 'addTransaction':
                return <FrmAddTransaction stateForm={action} currentData={currentData} userId={userId} />
            case 'addPlatform':
                return <FrmAddPlatform stateForm={action} currentData={currentData} />
            case 'history':
                return <ViewHistry currentData={currentData} />
            default:
                return <FrmRegisterProducts stateForm={action} currentData={currentData} />
        }
    }

    

    const btnNew = () => {
        return isAdmin ? <DialogTrigger onClick={handleNew}>Nuevo</DialogTrigger> : <></>
    }

    const authColumns = () => isAdmin ? productColumns : productColumns.filter(col => col.accessorKey !== 'cost')


    const columns = [...authColumns(),
    ...platformColumns.map((col) => {
        // console.log(col)
        return {
            header: col.name,
            // accessor: col.accessor,
            cell: ({ row }) => {
                let index = row.original['platformProducts'].findIndex((item) => item.typeTransactionId === col.id);
                let quantity = row.original['platformProducts']?.[index]?.['quantity'] || 0;
                let price = row.original['platformProducts']?.[index]?.['price'] || 0;

                // console.log(index)
                return (
                    <div className="flex justify-center">
                        {row.original['platformProducts']?.[index] ? `${quantity}/${price} Soles` : <></>}
                    </div>
                );
            },
        }
    }),
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
                                onClick={() => handleAddTransaction(row)}
                                className="cursor-pointer"
                            >
                                Registrar movimiento
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DialogTrigger
                                onClick={() => handleAddPlatform(row)}
                                className="cursor-pointer"
                            >
                                Registrar plataforma
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DialogTrigger
                                onClick={() => handleViewHistory(row)}
                                className="cursor-pointer"
                            >
                                Ver historial
                            </DialogTrigger>
                        </DropdownMenuItem>
                        {isAdmin && <DropdownMenuItem>
                            <DialogTrigger
                                onClick={(e) => handleEdit(e, row)}
                                className="cursor-pointer"
                            >
                                Editar
                            </DialogTrigger>
                        </DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
    ];

    useEffect(() => {
        // getAuth()
        fnGetPlatforms()
    }, [])

    return (<>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DataTable columns={columns} data={JSON.parse(products)} btnNew={btnNew} isAdmin={isAdmin} />
            <DialogContent className="w-full">
                <DialogHeader>
                    {!loading ? <DialogTitle>{titleForm()}</DialogTitle> : <DialogTitle></DialogTitle>}
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-4">
                        {!loading ?
                            // <FrmRegisterProducts stateForm={action} currentData={currentData} />
                            managerForm()
                            : <div className="w-full flex justify-center"><AiOutlineLoading className="mr-2 h-10 w-10 animate-spin" /></div>}
                    </div>
                </div>


            </DialogContent>
        </Dialog>
    </>)

}

export default ProductForms;