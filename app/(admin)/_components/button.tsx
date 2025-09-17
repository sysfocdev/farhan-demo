"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  href: string;
  Icon?: IconType;
}

export const Button = ({ label, href, Icon }: ButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/admin" && href === "/admin") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center w-full gap-x-2 m-1 text-slate-500 text-sm font-bold pl-7 transition-all hover:text-slate-800 hover:bg-slate-300/20 cursor-pointer",
        isActive &&
          "text-sky-700 rounded-md  bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        {Icon && (
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
        )}
        {label}
      </div>
    </button>
  );
};
