import { auth } from "@/server/auth";
import { NavLogo, UserBtn } from "./index";

const AppNav = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-4">
      <NavLogo />
      <UserBtn user={session?.user} expires={session?.expires!} />
    </nav>
  );
};

export default AppNav;
