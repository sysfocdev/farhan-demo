"use client";
import { HiChartPie } from "react-icons/hi";
import { FaUser, FaIdeal, FaList, FaPencilAlt } from "react-icons/fa";
import {
  MdOutlineManageHistory,
  MdAppSettingsAlt,
  MdContentPasteSearch,
} from "react-icons/md";
import { IoMdSettings, IoIosContact } from "react-icons/io";
import { FaMoneyCheck } from "react-icons/fa6";
import { SiCkeditor4 } from "react-icons/si";
import { SidebarItem } from "./sidebar-item";
import { useMemo } from "react";

const commonRoutes = [
  {
    icon: HiChartPie,
    label: "Dashboard",
    href: "/admin/dashboard",
  },

  {
    icon: FaList,
    label: "Manage Listings",
    childRoutes: [
      {
        label: "listings Brands",
        href: "/admin/listing/brand",
      },
      {
        label: "Add Listings",
        href: "/admin/listing/create",
      },
      {
        label: "Listings",
        href: "/admin/listing/view",
      },
      {
        label: "Pending Listings",
        href: "/admin/listing/approved",
      },
    ],
  },
  {
    icon: MdOutlineManageHistory,
    label: "Manage Website",
    childRoutes: [
      {
        label: "FAQ",
        href: "/admin/manage-website/faq",
      },
      {
        label: "Testimonial",
        href: "/admin/manage-website/testimoinal",
      },
    ],
  },
  {
    icon: IoMdSettings,
    label: "Settings",
    childRoutes: [
      {
        label: "General Settings",
        href: "/admin/setting/general",
      },
      {
        label: "Default Settings",
        href: "/admin/setting/default",
      },
      {
        label: "Currency",
        href: "/admin/setting/currency",
      },
      {
        label: "Social Media",
        href: "/admin/setting/social",
      },
    ],
  },
  {
    icon: MdAppSettingsAlt,
    label: "Page Settings",
    childRoutes: [
      {
        label: "Home",
        href: "/admin/page-settings/page",
      },
      {
        label: "Contact",
        href: "/admin/page-settings/contact",
      },
      {
        label: "Utility pages",
        href: "/admin/page-settings/about",
      },
    ],
  },
  {
    icon: IoIosContact,
    label: "Contact Submissions",
    href: "/admin/contact-submissions",
  },
  {
    icon: FaMoneyCheck,
    label: "Value Submissions",
    href: "/admin/value-submissions",
  },
  {
    icon: MdContentPasteSearch,
    label: "Car Enquiry",
    href: "/admin/car-enquiry",
  },
  {
    icon: MdContentPasteSearch,
    label: "Finance Enquiry",
    href: "/admin/finance-enquiry",
  },
  {
    icon: SiCkeditor4,
    label: "Meta Editor",
    href: "/admin/meta-editor",
  },
  {
    icon: FaPencilAlt,
    label: "Blog",
    href: "/admin/blog",
  },
];

const adminExtraRoutes = [
  {
    icon: FaUser,
    label: "Manage Users",
    childRoutes: [
      {
        label: "All Users",
        href: "/admin/manage-users",
      },
      {
        label: "Create User",
        href: "/admin/create-user",
      },
    ],
  },
  {
    icon: FaIdeal,
    label: "Manage Dealers",
    childRoutes: [
      {
        label: "All Dealers",
        href: "/admin/manage-dealers",
      },
      {
        label: "Create Dealer",
        href: "create-dealer",
      },
    ],
  },
];

const SidebarRoutes = ({ role }: { role: "admin" | "user" }) => {
  console.log("user role:", role);
  const routes = useMemo(() => {
    if (role === "admin") {
      const newRoutes = [...commonRoutes];
      newRoutes.splice(1, 0, ...adminExtraRoutes);
      return newRoutes;
    }
    return commonRoutes;
  }, []);

  return (
    <div className=" flex flex-col justify-center px-3 w-full">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
          childRoutes={route.childRoutes}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
