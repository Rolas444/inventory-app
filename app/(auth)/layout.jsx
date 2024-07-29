import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
const AuthLayout = ({ children }) => {


    return (<>
        <main className=" flex items-center justify-center h-screen min-h-screen">
            {/* <div className="flex items-center justify-center py-12"> */}

                {/* <div className=""> */}
                    <Card className="mx-auto max-w-sm mt-12">
                        {children}
                    </Card>
                {/* </div> */}

            {/* </div> */}
        </main>

    </>)
}

export default AuthLayout;