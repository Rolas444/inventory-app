import { auth } from "@/auth";
import BtnLogout from "@/components/ui/btn-logout";
import Link from "next/link";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  ArrowLeftRight,
  PackageMinus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNav from "@/components/navs/nav-main";
import MobileNav from "@/components/navs/nav-mobil";
import { AuthLevel } from "@/actions/auth-actions";
import  GetSession from "@/components/auth/get-session";

async function LayoutDash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const Level: string = await AuthLevel(session?.user.roleId);
  const objLevel = JSON.parse(Level);
  const stringSession: string = JSON.stringify(session);
  // console.log(Level);
  if (objLevel.error || !Level) {
    // console.log(objLevel.error);
    return <div>Acceso denegado</div>;
  }

  const menuList =
  objLevel.name !== "admin"
      ? [
          {
            title: "Products",
            icon: <Package className="h-4 w-4" />,
            href: "/products",
          },
        ]
      : [
          {
            title: "Dashboard",
            icon: <Home className="h-4 w-4" />,
            href: "/dashboard",
          },
          // {
          //   title: "Orders",
          //   icon: <ShoppingCart className="h-4 w-4" />,
          //   href: "/orders",
          // },
          {
            title: "Products",
            icon: <Package className="h-4 w-4" />,
            href: "/products",
          },
          // {
          //   title: "Movimientos",
          //   icon: <ArrowLeftRight className="h-4 w-4" />,
          //   href: "/transactions",
          // },
          {
            title: "Tipos de Movimiento",
            icon: <PackageMinus className="h-4 w-4" />,
            href: "/type-transactions",
          },
          {
            title: "Usuarios",
            icon: <Users className="h-4 w-4" />,
            href: "/users",
          },
          {
            title: "Reportes",
            icon: <LineChart className="h-4 w-4" />,
            href: "/reports",
          },
        ];

  return (
    <>
    <GetSession dataSession={stringSession} />
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                {/* <img src="/logo.svg" alt="logo" className="h-6" /> */}
                <span>Inventario</span>
              </Link>
              {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button> */}
            </div>
            <div className="flex-1">
              <MainNav menuList={menuList} />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <MobileNav menuList={menuList} />
              </SheetContent>
            </Sheet>
            {/* <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div> */}
            <div className="w-full flex-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  // size="icon"
                  // className="rounded-sm px-2"
                >
                  <span>
                    {session ? session.user.name : "sin sesion abierta"}
                  </span>
                  {/* <CircleUser className="h-5 w-5" /> */}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {session ? session.user.email : "no hay sesion"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                <DropdownMenuItem>Ajustes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BtnLogout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex h-screen flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default LayoutDash;
