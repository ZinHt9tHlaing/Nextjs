"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  label: string;
}

const NavLink = ({ path, label }: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`text-sm mx-3 font-medium tracking-wider ${
        pathName === path
          ? "text-gray-100 px-2 py-1 bg-black rounded-md -transition-transform duration-300"
          : "text-gray-500 underline-offset-4 hover:underline duration-300"
      } `}
    >
      {label}
    </Link>
  );
};

export default NavLink;
