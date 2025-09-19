import { getCurrentlyAuthenticatedUser } from "@/actions/auth.action";
import { MobileSidebar } from "./_components/mobile-sidebar";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { UserType } from "@/lib/types";

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const user: UserType = await getCurrentlyAuthenticatedUser();
  console.log("layout:", user);
  return (
    <div className="flex flex-col h-screen ">
      <div className="h-[80px] fixed top-0 left-0 w-full z-9999999">
        <Navbar user={user} />
      </div>
      <div className=" top-[80px] fixed  pl-4 mt-4">
        <MobileSidebar />
      </div>
      <div className="flex flex-1">
        <div className=" hidden border-r shadow-sm transition duration-300 ease-in-out top-[80px] md:flex h-full w-70  fixed flex-col  inset-y-0 z-10000">
          <Sidebar user={user} />
        </div>

        <main className="md:pl-70  flex-1 overflow-hidden bg-slate-100 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
