"use client";
import Link from "next/link";
import { Package2 } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileNav = ({ menuList, iconMain = null }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          {iconMain ? iconMain : <Package2 className="h-6 w-6" />}
          <span className="sr-only">Acme Inc</span>
        </Link>
        {menuList.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${isActive ? " text-foreground " : " text-muted-foreground "} hover:text-foreground`}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default MobileNav;
