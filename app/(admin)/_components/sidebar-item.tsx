"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconType } from "react-icons";
import { Button } from "./button";
import { AccordionButton } from "./accordionButton";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href?: string;
  childRoutes?: { label: string; href: string }[];
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  childRoutes,
}: SidebarItemProps) => {
  return (
    <>
      {childRoutes ? (
        <>
          <Accordion type="single" collapsible defaultValue="item1">
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger>
                <AccordionButton label={label} Icon={Icon} />
              </AccordionTrigger>
              <AccordionContent>
                {childRoutes.map((route, index) => (
                  <Button key={index} label={route.label} href={route.href} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="flex justify-start">
          <Button label={label} href={href!} Icon={Icon!} />
        </div>
      )}
    </>
  );
};
