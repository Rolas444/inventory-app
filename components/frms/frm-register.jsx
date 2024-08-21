'use client'
import { useForm } from "react-hook-form";
import InputControlled from "../ui/input-controlled";
import { RegisterAction } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Combo } from "next/font/google";
// import AutocompleteControlled from "@/components/ui/autocomplete-controlled";
// import ComboboxControlled from "@/components/ui/combobox-controlled";
import SelectControlled from "@/components/ui/select-controlled";
import CheckboxControlled from "@/components/ui/checkbox-controlled";
import { useEffect, useState } from "react";
import { getQuery, updateQuery } from "@/actions/query-actions";
import { createOptions } from "@/lib/utils";
import { updateDataForm } from "@/lib/tools";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useInventoryStore } from "@/zustand/store";

const FrmRegister = ({stateForm, currentData}) => {

    // console.log(currentData);
    const {setModalOpen} = useInventoryStore();
    const router = useRouter();
    const [modalLoading, setModalLoading] = useState(false);
    const [initForm, setInitForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        roleId: ''
    });

    const dataForm = stateForm==='edit'?  updateDataForm(initForm,currentData, 'id') : initForm;
    const { control, handleSubmit,watch, reset } = useForm(
        { defaultValues: stateForm==='edit'?  dataForm: initForm }
    );
    const [roles, setRoles] = useState([]);



    const onSubmit = async () => {
        setModalLoading(true);
        var result = {}
        // toast.info('Registrando usuario');
        console.log(watch());
        if(stateForm ==='new'){
            result = await RegisterAction({...watch()});
            console.log(result);
        }

        if(stateForm ==='edit'){
            const formData = {...watch()};
            if(formData.password!==currentData.password){
                formData.password = await bcrypt.hash(formData.password, 10);
            }

            result = await updateQuery('user', {id: formData.id},  formData);
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
        setModalOpen(false);
    }

    const getRoles = async () => {
        const result = await getQuery("role");
        if (result.error) {
            toast.error('Error al obtener roles');
        }


        setRoles(createOptions(result.data, 'id', 'name'));
    }

    // console.log(watch())

    useEffect(()=>{
        getRoles();
        
    },[])

    // useEffect(()=>{
    //     if(stateForm==='edit ' && currentData.length>0){
    //         reset(dataForm);
    //     }
    // },[currentData])

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
                        <InputControlled name='phone' control={control} label='Celular' rules={{ required: false }} />
                        {/* <AutocompleteControlled name='roleId' control={control} label='Rol' options={roles} /> */}
                        {/* <ComboboxControlled name='roleId' control={control} label='Rol' options={roles} /> */}
                        <SelectControlled name='roleId' control={control} label='Rol' options={roles} />
                        {/* <CheckboxControlled name='status' control={control} label='Activo' /> */}

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

export default FrmRegister;