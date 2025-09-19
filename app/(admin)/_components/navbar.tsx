import { Profile } from "@/components/profile";
import Logo from "./logo";
import { UserType } from "@/lib/types";

const Navbar = async ({ user }: { user: UserType }) => {
  let userInfo;
  if (user) {
    userInfo = JSON.parse(JSON.stringify(user));
  } else {
    userInfo = "";
  }
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
        <Profile user={userInfo} />
      </div>
    </div>
  );
};

export default Navbar;
