'use client'
import { useForm } from "react-hook-form";
import InputControlled from "../ui/input-controlled";
import { RegisterAction } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Combo } from "next/font/google";
// import AutocompleteControlled from "@/components/ui/autocomplete-controlled";
import ComboboxControlled from "@/components/ui/combobox-controlled";

const FrmRegister = () => {
    const { control, handleSubmit,watch } = useForm();
    const roles = [{label:'Administrador',value:'1'},{label:'Usuario',value:'2'}]

    const onSubmit = async () => {
        toast.info('Registrando usuario');
        console.log(watch());
        let result = await RegisterAction(watch());
        if(result.error){
           toast.error(result.error);
        }
        if(result.success){
            toast.success('Usuario registrado');
        }
    }

    console.log(watch())

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div>
                        <InputControlled name="name" control={control} label="Nombres" rules={{ required: false }} />
                        <InputControlled name="email" type="email" control={control} label="Correo" rules={{ required: true }} />
                        <InputControlled name="password" type="password" control={control} label="Contraseña" rules={{ required: true }} />
                    </div>
                    <div>
                        <InputControlled name='phone' control={control} label='Celular' rules={{ required: true }} />
                        {/* <AutocompleteControlled name='roleId' control={control} label='Rol' options={roles} /> */}
                        <ComboboxControlled name='roleId' control={control} label='Rol' options={roles} />

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>

        </div>
    </>)
}

export default FrmRegister;