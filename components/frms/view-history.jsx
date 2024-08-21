import { getQuery } from "@/actions/query-actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ViewHistory = ({currentData}) => {

    const [history, setHistory] = useState([]);

    const fnGetHistory = async () => {
        const result = await getQuery('Transaction', {
            where: {
                productId: currentData.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                typeTransaction: true
            },
            
        })
        console.log(result);
        if (result.error) {
            toast.error('Error al obtener historial');
        }
        if (result.success) {
            setHistory(result.data);
        }
    }

    useEffect(()=>{
        fnGetHistory();
    },[])

    return (<>
        <div className="w-full p-2">
        <h1 className="font-bold">{currentData?.name}   <span className="text-sm text-teal-600 font-normal">sku: {currentData.sku}</span></h1>

        <div className="w-full mt-3 text-xs">
            <table className="w-full">
                <thead className="text-left">
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Cnt.</th>
                        <th>detalle</th>

                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.createdAt}</td>
                            <td>{item.typeTransaction.name}</td>
                            <td>{item.type === 'I'? `+${item.quantity}`: `-${item.quantity}`}</td>
                            <td>{item.detail}</td>
                            <td>{item.user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        
    </>);

}

export default ViewHistory;