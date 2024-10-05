import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link href={"/"} className="text-3xl font-bold text-primary">
      <ShoppingCart size={42} />
    </Link>
  );
};

export default NavLogo;
