import { Profile } from "@/components/profile";
import Logo from "./logo";

const Navbar = () => {
  return (
    <div className=" px-10 border-b h-full items-center flex justify-between bg-white shadow-sm z-50 ">
      <div className="flex items-center gap-x-3">
        <Logo />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">WindScreen</h1>
          <p className="text-sm">Build to sell cars</p>
        </div>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
