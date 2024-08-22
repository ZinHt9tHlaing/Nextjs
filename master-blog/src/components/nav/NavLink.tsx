import Link from "next/link";

interface NavLinkProps {
  path: string;
  label: string;
}

const NavLink = ({ path, label }: NavLinkProps) => {
  return (
    <Link href={path}>
     {label}
    </Link>
  );
};

export default NavLink;
