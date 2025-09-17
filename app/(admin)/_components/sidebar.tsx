import { MdLogout } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-screen  flex flex-col bg-white  pt-8 ">
      <div className="flex flex-col w-full items-center h-full">
        <div className="  flex flex-col flex-start items-center mb-2">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p>role</p>
        </div>
        <Separator />

        <div className="h-[80%] w-full overflow-auto">
          <SidebarRoutes role="admin" />
        </div>
        <Separator />

        <div className="">
          <button
            type="button"
            className="flex items-center justify-center gap-x-3 text-slate-500 text-xl font-bold  transition-all hover:text-slate-800 hover:bg-slate-300/20 w-full cursor-pointer"
          >
            <MdLogout size={22} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
