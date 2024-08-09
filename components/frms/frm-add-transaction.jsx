'use client'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";
import { getQuery } from "@/actions/query-actions";
import { createOptions } from "@/lib/utils";
import { toast } from "sonner";

const FrmAddTransaction = ({currentData}) => {

    const [modalLoading, setModalLoading] = useState(false);
    const [typeTransactions, setTypeTransactions] = useState([])
    const [types, setTypes] = useState([
        { value: 'I', label: 'Ingreso' },
        { value: 'O', label: 'Salida' }
    ])
    const [tOps, setTOps] = useState([])
    const { control, handleSubmit, watch } = useForm()
    const [initForm, setInitForm] = useState({
        date: '',
        cantidad: 0,
        typeTransactionId: null,
        productId: currentData.id,
        type: null,
        detail: ''
    });

    const fnGetTypesTransactions = async () => {
        // const result = []
        const result = await getQuery('TypeTransaction', {
            where: {
                status: true
            }
        })

        // console.log(result);
        if (result.error) {
            toast.error('Error al obtener plataformas');
        }
        if (result.success) {

            setTypeTransactions(createOptions(result.data,'id','name'));
        }

    }

    const onSubmit = () => {

    }

    useEffect(()=>{
        fnGetTypesTransactions()
    },[])

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div className="w-full">
                        <InputControlled name='date' type="date" control={control} label='Fecha' rules={{ required: false }} />
                        <InputControlled name='cantidad' type="number" control={control} label='cantidad' rules={{ required: false }} />
                        <SelectControlled name='typeTransactionId' control={control} label='Tipo de movimiento' rules={{ required: false }} options={typeTransactions} />

                    </div>
                    <div className="w-full">
                        <SelectControlled name='type' control={control} label='Tipo de Operación' rules={{ required: false }} options={types} />

                    </div>
                </div>
                <div className="w-full">
                    <InputControlled name='detail' control={control} label='Sustento' rules={{ required: false }} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary" disabled={modalLoading}>Guardar</button>
                </div>
            </form>
        </div>
    </>)
}

export default FrmAddTransaction;