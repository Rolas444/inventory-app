import FrmLogin from "@/components/frm-login";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoginPage = () => {
    return (<>
        
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Ingresa tu correo y contraseña para iniciar sesión.
            </CardDescription>
        </CardHeader>
        
            <FrmLogin />

    </>)
}

export default LoginPage;