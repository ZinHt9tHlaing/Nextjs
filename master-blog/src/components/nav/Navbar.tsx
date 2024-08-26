import Link from "next/link";
import NavLink from "./NavLink";
import AddBtn from "./AddBtn";
import Profile from "./Profile";
import { auth } from "@/lib/auth";
import AuthBtn from "./AuthBtn";

const Links = [
  {
    path: "/faq",
    label: "FAQS",
  },
  {
    path: "/logs",
    label: "Change-logs",
  },
  {
    path: "/about",
    label: "About",
  },
];

const Navbar = async () => {
  const session = await auth();
  // console.log(session);

  return (
    <div className=" w-2/3 mx-auto flex items-center justify-between py-4 border-b-2">
      <div className="flex items-center">
        <Link href="/" className=" font-bold text-3xl">
          M-BLOG
        </Link>
        <div className=" ms-5">
          {Links.map((link, index) => (
            <NavLink key={index} path={link.path} label={link.label} />
          ))}
        </div>
      </div>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <AddBtn />
          <Profile />
        </div>
      ) : (
        <div>
          <AuthBtn />
        </div>
      )}
    </div>
  );
};

export default Navbar;
