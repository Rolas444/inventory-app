'use client'
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";
import { useRouter } from "next/navigation";
import { createOptions } from "@/lib/utils";
import { createQuery, getQuery, updateQuery } from "@/actions/query-actions";
import { updateDataForm } from "@/lib/tools";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const FrmAddPlatform = ({ stateForm, currentData }) => {

    const [modalLoading, setModalLoading] = useState(false);

    const [platforms, setPlatforms] = useState([])
    const [actionForm, setActionForm] = useState('new');
    const router = useRouter();
    // console.log(currentData);
    const [initForm, setInitForm] = useState({
        productId: currentData.id,
        typeTransactionId: '',
        quantity: '',
        price: '',
    });
    const { control, handleSubmit, setValue,reset, watch } = useForm({
        defaultValues: initForm
    })

    const fnGetPlatforms = async () => {
        const result = await getQuery('TypeTransaction', {
            where: {
                platform: true,
                visible: true,
                status: true
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
                reset(updateDataForm(initForm, exists.data[0], 'id'));
            }
            if(exists.data.length===0){
                setActionForm('new');
                reset(initForm);
                setValue('typeTransactionId', idSelected);
            }
        }   
    }

    const onSubmit = async () => {
        console.log('llegamos al submit')
        setModalLoading(true);
        const validForm = {...watch()};
        validForm.quantity = Number(validForm.quantity);
        validForm.price = Number(validForm.price);
        var result = {}
        // toast.info('Registrando usuario');
        // console.log(watch());
        if(actionForm ==='new'){
            let sresult = await createQuery('PlatformProduct',{...validForm});
            result = JSON.parse(sresult);
            // console.log(result);
        }

        if(actionForm ==='edit'){
            const formData = validForm;
            result = await updateQuery('PlatformProduct', {id: formData.id},  formData);
        }

        
        if(result.error){
            console.log(result)
           toast.error(result.error);
        }

        if(result.success){
            toast.success('Registro satisfactorio');
        }
        setModalLoading(false);
        router.refresh();
    }

    useEffect(()=>{
        fnGetPlatforms()
    },[])

    console.log(watch())

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="my-2 font-bold">Producto: {currentData?.name}</label>
                <div className="w-full">

                    <SelectControlled name='typeTransactionId' onChangeFn={(e)=>fnOnChangePlatform(e)} control={control} label='Plataforma' rules={{ required: false }} options={platforms} />

                </div>
                <div className="w-full flex justify-between gap-2">

                    <div className="w-full">
                        <InputControlled name='quantity' type="number" control={control} label='Cantidad Ofertada' rules={{ required: false }} />

                    </div>
                    <div className="w-full">
                        <InputControlled name='price' type="number" control={control} label='Precio' rules={{ required: false }} />
                    </div>
                </div>
                <div className="flex justify-end">
                    {modalLoading ? <Loader className="animate-spin w-5 h-5" />:<button type="submit" className="btn btn-primary" >Guardar</button>}
                </div>
            </form>
        </div>
    </>)
}

export default FrmAddPlatform;