'use client'
import { useForm } from "react-hook-form"

const FrmLogin = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    return (<>
    <div className="">
        <form>
            <input type="text" placeholder="Usuario" {...register("usuario", { required: true })} />
            <input type="password" placeholder="Contraseña" {...register("contrasena", { required: true })} />
            <div>
                <button type="submit">Ingresar</button>
            </div>
        </form>
        
    </div>
    </>)
}

export default FrmLogin;