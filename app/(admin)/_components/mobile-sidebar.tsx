"use client";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetHeader>
        <SheetTitle></SheetTitle>
      </SheetHeader>

      <SheetContent
        side="left"
        className="p-0 bg-white flex justify-center items-center"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
