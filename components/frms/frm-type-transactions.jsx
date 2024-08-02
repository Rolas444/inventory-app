import { useState } from "react";
import { useForm } from "react-hook-form";
import InputControlled from "../ui/input-controlled";
import { Check } from "lucide-react";
import CheckboxControlled from "../ui/checkbox-controlled";
import { createQuery } from "@/actions/query-actions";
import { toast } from "sonner";
import { platform } from "os";
import { useRouter } from "next/navigation";

const FrmTypeTransactions = ({ stateForm }) => {

    const router = useRouter();


    const [initForm, setInitForm] = useState({
        name: '',
        description: '',
        status: false,
        platform: false,
        visible: false
    });

    const { control, handleSubmit, watch } = useForm(
        { defaultValues: initForm }
    );

    const onSubmit = async () => {

        var result = {}
        toast.info('Registrando Tipo de movimiento');
        console.log(watch());
        if(stateForm ==='new'){
            let sresult = await createQuery('TypeTransaction', {...watch()});
            result = JSON.parse(sresult);
            console.log(result);
        }
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
                        <CheckboxControlled control={control} name="status" label="Activo" />
                        <CheckboxControlled control={control} name="platform" label="Es plataforma" />
                        <CheckboxControlled control={control} name="visible" label="Visible en Tabla" />

                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </form>

        </div>
    </>)
}

export default FrmTypeTransactions;