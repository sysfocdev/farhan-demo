"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ProfilePicture from "./profilePicture";
import { useState } from "react";
import Link from "next/link";
import { UserType } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Profile({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false);
  // const isUser = user?.role === "user";

  const navLinks: {
    title: string;
    link: string;
  }[] = [
    { title: "Your Profile", link: "/profile" },
    { title: "Reset Password", link: "/reset-password" },
  ];
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-auto p-0 rounded-full relative"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ProfilePicture image={user?.profileImg} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="z-99999999">
              <p>Account Options</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-999999999" align="start">
        <DropdownMenuLabel>
          <Link
            className="text-lg block"
            href="/admin/profile"
            onClick={() => setOpen(false)}
          >
            {user?.name || "User Name"}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navLinks
          .filter((ele) => ele.link !== "")
          .map((ele) => (
            <DropdownMenuItem
              key={ele.title}
              asChild
              className="cursor-pointer px-2 py-1.5"
            >
              <Link
                href={ele.link}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between w-full"
              >
                {ele.title}
              </Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <form onSubmit={() => setOpen(false)} className="p-1">
          <Button type="submit" className="w-full cursor-pointer font-bold">
            Logout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
