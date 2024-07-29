'use client'
// import { signIn } from "@/auth";
import { useForm } from "react-hook-form"
import { LoginAction } from "@/actions/auth-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

const FrmLogin = () => {
    const route = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        setLoading(true);
        const data = { ...watch() };
        // console.log(data);
        // fnLogin(data)
        const resultLogin = await LoginAction(data);
        if (resultLogin.success) {
            route.push('/');
        }
        else {

            toast.error('Usuario o contraseña incorrectos');
            setLoading(false);
        }
        
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  ">
                <div className="w-full flex items-center flex-col p-2">
                    <div className="w-full  p-2">
                        <Label>Usuario</Label>
                        <Input type="text" {...register("username", { required: true })} />
                    </div>
                    <div className="w-full  p-2">
                        <Label>Contraseña</Label>
                        <Input type="password" {...register("password", { required: true })} />
                    </div>
                    <div>
                        {loading ? <Button disabled>Cargando...</Button> : <Button type="submit">Ingresar</Button>}
                    </div>


                </div>
                
            
        </form>

    </>)
}

export default FrmLogin;