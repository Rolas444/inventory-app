'use client'
// import { signIn } from "@/auth";
import { useForm } from "react-hook-form"
import { LoginAction } from "@/actions/auth-actions";

const FrmLogin = ({fnLogin}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = async () => {
        const data = {...watch()};
        // console.log(data);
        // fnLogin(data)
        await LoginAction(data);
    }

    return (<>
    <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
            <input type="text" placeholder="Usuario" {...register("username", { required: true })} />
            <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
            </div>
            <div>
                <button type="submit">Ingresar</button>
            </div>
        </form>
        
    </div>
    </>)
}

export default FrmLogin;