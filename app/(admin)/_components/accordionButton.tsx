"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  Icon: IconType;
}

export const AccordionButton = ({ label, Icon }: ButtonProps) => {
  return (
    <div className="flex items-center gap-x-2 text-slate-500 text-sm font-bold pl-7 transition-all hover:text-slate-800 hover:bg-slate-300/20 cursor-pointer">
      <div className="flex items-center gap-x-2 py-3">
        <Icon size={22} className="text-slate-500" />

        {label}
      </div>
      <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all" />
    </div>
  );
};
