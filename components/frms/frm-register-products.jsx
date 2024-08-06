'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputControlled from "@/components/ui/input-controlled";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createQuery, updateQuery } from "@/actions/query-actions";
import { updateDataForm } from "@/lib/tools";

const FrmRegisterProducts = ({ stateForm, currentData }) => {
    const [modalLoading, setModalLoading] = useState(false);

    const router = useRouter()
    const [initForm, setInitForm] = useState({
        name: '',
        sku: '',
        status: false,
        stock: 0,
        price: 0.00,
        cost: 0.00,
        wholesale: 0.00,
        image: ''
    });

    const dataForm = stateForm === 'edit' ? currentData : initForm;

    const { control, handleSubmit,watch } = useForm(
        { defaultValues: stateForm==='edit'? updateDataForm(initForm, dataForm, 'id'): initForm }
    );

    const onSubmit = async () => {
        setModalLoading(true);
        var result = {}
        toast.info('Registrando Tipo de movimiento');
        console.log(watch());
        const currentForm = {...watch()};
        currentForm.stock = Number(currentForm.stock);
        currentForm.price = Number(currentForm.price);
        currentForm.cost = Number(currentForm.cost);
        currentForm.wholesale = Number(currentForm.wholesale);

        if(stateForm ==='new'){
            let sresult = await createQuery('Product', currentForm);
            result = JSON.parse(sresult);
            console.log(result);
        }

        if(stateForm ==='edit'){
            const formData = {...watch()};

            result = await updateQuery('Product', {id: formData.id},  formData);
        }

        if(result.error){
            console.log(result)
           toast.error(result.error);
        }
        if(result.success){
            toast.success('Se guardó correctamente ');
            router.refresh();
        }
        
        setModalLoading(false);
    }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div>
                        <InputControlled name="name" control={control} label="Nombre" rules={{ required: false }} />
                        <InputControlled name="sku" type="text" control={control} label="SKU" rules={{ required: true }} />
                        <InputControlled name="stock" type="number" control={control} label="stock" rules={{ required: true }} />
                        <InputControlled name="price" type="number" control={control} label="Precio" rules={{ required: true }} />
                        <InputControlled name="wholesale" type="number" control={control} label="Precio Mayoreo" rules={{ required: true }} />
                        <InputControlled name="cost" type="number" control={control} label="Costo" rules={{ required: true }} />
                    </div>
                    <div>

                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary" disabled={setModalLoading}>Guardar</button>
                </div>
            </form>
        </div>
    </>)

}

export default FrmRegisterProducts;