'use client'
import { useForm } from "react-hook-form";
import InputControlled from "../ui/input-controlled";

const FrmRegister = () => {
    const { control, handleSubmit,watch } = useForm();

    const onSubmit = async () => {
        console.log(watch());
    }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col">
                    <div>
                        <InputControlled name="name" control={control} label="Nombres" rules={{ required: false }} />
                    </div>
                    <div>
                        <InputControlled name="email" type="email" control={control} label="Correo" rules={{ required: true }} />
                    </div>
                    <div>
                        <InputControlled name="password" type="password" control={control} label="Contraseña" rules={{ required: true }} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                </div>
            </form>

        </div>
    </>)
}

export default FrmRegister;