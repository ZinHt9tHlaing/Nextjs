import Link from "next/link";
import { Button } from "../ui/button";

type AuthFooterProps = {
  footerLabel: string;
  footerHref: string;
};

const AuthFooter = ({ footerLabel, footerHref }: AuthFooterProps) => {
  return (
    <Button variant={"link"} className="pl-0 w-full" asChild>
      <Link href={footerHref}>
        <p className="active:scale-95 mx-auto -transition-transform duration-200">
          {footerLabel}
        </p>
      </Link>
    </Button>
  );
};

export default AuthFooter;
