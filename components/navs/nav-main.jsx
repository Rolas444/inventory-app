"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = ({ menuList }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {menuList.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${isActive ? " text-primary " : " text-muted-foreground "} transition-all hover:text-primary`}
            >
              {/* <item.icon className="h-4 w-4" /> */}
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
};
export default MainNav;
