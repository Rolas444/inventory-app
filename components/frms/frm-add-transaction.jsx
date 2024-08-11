'use client'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";
import { createQuery, getQuery } from "@/actions/query-actions";
import { createOptions } from "@/lib/utils";
import { toast } from "sonner";

const FrmAddTransaction = ({currentData}) => {

    const [modalLoading, setModalLoading] = useState(false);
    const [typeTransactions, setTypeTransactions] = useState([])
    const [types, setTypes] = useState([
        { value: 'I', label: 'Ingreso' },
        { value: 'O', label: 'Salida' }
    ])
    
    const today = new Date().toISOString().split('T')[0]
    // console.log(toDay);
    const [initForm, setInitForm] = useState({
        dateOp: today,
        typeTransactionId: null,
        productId: currentData.id,
        type: null,
        detail: ''
    });

    const { control, handleSubmit, watch, reset } = useForm({
        defaultValues: initForm
        })

    const fnGetPlatforms = async () => {
        const result = await getQuery('PlatformProduct', {
            where: {
                productId: currentData.id
            }
        })
        console.log(result);
        if (result.error) {
            toast.error('Error al obtener plataformas');
        }
        if (result.success) {

            // setPlatforms(createOptions(result.data,'id','name'));
            return result.data;
        }
    }

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

            const platforms = await fnGetPlatforms();
            console.log(platforms);
            let activePlatforms = result.data.filter((item)=>{
                if(!item.platform){
                    return item
                }
                return platforms.find((p)=>p.typeTransactionId === item.id)
            })

            console.log(activePlatforms);
            console.log(result.data);
            setTypeTransactions(createOptions(activePlatforms,'id','name'));
        }

    }

    const fnSaveTransaction = async (data) => {
        var result = {}
        let sresult = await createQuery('Transaction', data);
            result = JSON.parse(sresult);
            console.log(result);

        if(result.error){
            console.log(result)
           toast.error(result.error);
        }
        if(result.success){
            toast.success('Se guardó correctamente ');
            // router.refresh();
        }
    }

    const onSubmit = async () => {
        setModalLoading(true);
        
        toast.info('Registrando Tipo de movimiento');
        console.log(watch());
        const currentForm = {...watch()};
        currentForm.stock = Number(currentForm.quantity);
        await fnSaveTransaction(currentForm);
        setModalLoading(false);
    }

    useEffect(()=>{
        fnGetTypesTransactions()
    },[])

    // console.log(watch())

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div className="w-full">
                        <InputControlled name='dateOp' type="date" control={control} label='Fecha' rules={{ required: true }} />
                        <InputControlled name='quantity' type="number" control={control} label='cantidad' rules={{ required: false }} />
                        <SelectControlled name='typeTransactionId' control={control} label='Tipo de movimiento' rules={{ required: true }} options={typeTransactions} />

                    </div>
                    <div className="w-full">
                        <SelectControlled name='type' control={control} label='Tipo de Operación' rules={{ required: true }} options={types} />

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