'use client'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";
import { useRouter } from "next/navigation";
import { createOptions } from "@/lib/utils";
import { getQuery } from "@/actions/query-actions";

const FrmAddPlatform = ({ stateForm, currentData }) => {

    const [modalLoading, setModalLoading] = useState(false);

    const [platforms, setPlatforms] = useState([])
    const [actionForm, setActionForm] = useState('new');
    const router = useRouter();
    // console.log(currentData);
    const [initForm, setInitForm] = useState({
        // productId: currentData.id,
        typeTransactionId: '',
        quantity: '',
        price: '',
    });
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: initForm
    })

    const fnGetPlatforms = async () => {
        const result = await getQuery('TypeTransaction', {
            where: {
                platform: true,
                visible: true
            }
        })
        console.log(result);
        if (result.error) {
            toast.error('Error al obtener plataformas');
        }
        if (result.success) {

            setPlatforms(createOptions(result.data,'id','name'));
        }
    }

    const fnOnChangePlatform = async (idSelected)=>{
        console.log(idSelected);
        let exists = await getQuery('PlatformProduct', {
            where: {
                AND: [
                    { productId: currentData.id },
                    { typeTransactionId: idSelected }
                ]
            }
        })
        if (exists.error) {
            toast.error('Error al obtener plataformas');
        }
        if (exists.success) {
            if(exists.data.length>0){
                setActionForm('edit');
                setValue('quantity',exists.data[0].quantity)
                setValue('price',exists.data[0].price)
                setValue('id', exists.data[0].id)
            }
            if(exists.data.length===0){
                setActionForm('new');
                setValue('quantity',0)
                setValue('price',0)
            }
        }   
    }

    const onSubmit = () => {

    }

    useEffect(()=>{
        fnGetPlatforms()
    },[])

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="my-2 font-bold">Producto: {currentData?.name}</label>
                <div className="w-full">

                    <SelectControlled name='typeTransactionId' onChangeFn={(e)=>fnOnChangePlatform(e)} control={control} label='Plataforma' rules={{ required: false }} options={platforms} />

                </div>
                <div className="w-full flex justify-between gap-2">

                    <div className="w-full">
                        <InputControlled name={'qty'} type="number" control={control} label='Cantidad Ofertada' rules={{ required: false }} />

                    </div>
                    <div className="w-full">
                        <InputControlled name='precio' type="number" control={control} label='Precio' rules={{ required: false }} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary" disabled={modalLoading}>Guardar</button>
                </div>
            </form>
        </div>
    </>)
}

export default FrmAddPlatform;