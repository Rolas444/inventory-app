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

const FrmLogin = () => {
    const route = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        const data = { ...watch() };
        console.log(data);
        // fnLogin(data)
        const resultLogin = await LoginAction(data);
        if (resultLogin.success) {
            route.push('/dashboard');
        }
        else {
            toast.error('Usuario o contraseña incorrectos');
        }
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="grid items-start gap-4">
                <div className="grid gap-4 mb-2">
                    <div className="grid gap-2">
                        <Label>Usuario</Label>
                        <Input type="text" {...register("username", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Contraseña</Label>
                        <Input type="password" {...register("password", { required: true })} />
                    </div>


                </div>
                <Button type="submit" className="w-full">Sign in</Button>
            
        </form>

    </>)
}

export default FrmLogin;