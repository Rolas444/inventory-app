'use client'
import { useForm } from "react-hook-form"

const FrmLogin = ({fnLogin}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        fnLogin(data);
    }

    return (<>
    <div className="w-full flex justify-center">
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