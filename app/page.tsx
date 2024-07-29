import { AuthLevel } from "@/actions/auth-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function InitPage() {
  const session = await auth();
  const Level: any = await AuthLevel(session?.user.roleId);
  if (Level.error) {
    console.log(Level.error);
    return <div className="w-full items-center text-red">Error de autenticación</div>
  }

  if(Level.name === "admin") {
    redirect("/dashboard");
  } else {
    redirect("/products");
  }
  return (
    <>
    <div>

    </div>
    </>
  );
}
