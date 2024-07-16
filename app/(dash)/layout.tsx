import {auth} from "@/auth"
import BtnLogout from "@/components/ui/btn-logout"

async function LayoutDash() {
    const session = await auth();

    if (!session) {
        return <div>loading...</div>;
    }

  return (
    <>
    <div className="container">
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
    <div>
        <BtnLogout />
    </div>
  </>)
}

export default LayoutDash