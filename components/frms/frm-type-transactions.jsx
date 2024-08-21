import { useState } from "react";
import { useForm } from "react-hook-form";
import InputControlled from "../ui/input-controlled";
import { Check, Loader } from "lucide-react";
import CheckboxControlled from "../ui/checkbox-controlled";
import { createQuery, updateQuery } from "@/actions/query-actions";
import { toast } from "sonner";
import { platform } from "os";
import { useRouter } from "next/navigation";
import { updateDataForm } from "@/lib/tools";

const FrmTypeTransactions = ({ stateForm , currentData }) => {

    const router = useRouter();

    const [modalLoading, setModalLoading] = useState(false);
    const [initForm, setInitForm] = useState({
        name: '',
        description: '',
        platform: false,
        visible: false
    });

    const dataForm  = stateForm==='edit'? updateDataForm(initForm, currentData, 'id') : initForm;

    const { control, handleSubmit, watch } = useForm(
        { defaultValues: stateForm==='edit'? dataForm:initForm }
    );

    const onSubmit = async () => {
        setModalLoading(true);
        var result = {}
        toast.info('Registrando Tipo de movimiento');
        console.log(watch());
        if(stateForm ==='new'){
            let sresult = await createQuery('TypeTransaction', {...watch()});
            result = JSON.parse(sresult);
            console.log(result);
        }
        
        if(stateForm ==='edit'){
            const formData = {...watch()};

            result = await updateQuery('TypeTransaction', {id: formData.id},  formData);
        }
        setModalLoading(false);
        if(result.error){
            console.log(result)
           toast.error(result.error);
        }
        if(result.success){
            toast.success('Se guardó correctamente ');
            router.refresh();
        }
        
    }


    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-start">
                    <div className="w-full">
                        <InputControlled control={control} name="name" label="Nombre" rules={{ required: true }} />
                        <InputControlled control={control} name="description" label="Descripción" />
                        {/* <CheckboxControlled control={control} name="status" label="Activo" /> */}
                        <CheckboxControlled control={control} name="platform" label="Es plataforma" />
                        <CheckboxControlled control={control} name="visible" label="Visible en Tabla" />

                    </div>
                </div>
                <div className="flex justify-end">
                    {/* <button type="submit" className="btn btn-primary">Guardar</button> */}
                    {modalLoading ? <Loader className="animate-spin w-5 h-5" />:<button type="submit" className="btn btn-primary" >Guardar</button>}
                </div>
            </form>

        </div>
    </>)
}

export default FrmTypeTransactions;