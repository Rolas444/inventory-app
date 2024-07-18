import {auth} from "@/auth"
import BtnLogout from "@/components/ui/btn-logout"

async function LayoutDash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    // if (!session) {
    //     return <div>loading...</div>;
    // }

  return (
    <>
    {session && <div className="container">
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </div> }
    <div>
        <BtnLogout />
    </div>
    {children}
  </>)
}

export default LayoutDash