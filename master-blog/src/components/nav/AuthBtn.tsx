import Link from "next/link";
import { Button } from "../ui/button";

const AuthBtn = () => {
  return (
    <div className="flex gap-4">
      <Button
        size={"sm"}
        variant={"outline"}
        className="border border-black active:scale-95 duration-200"
        asChild
      >
        <Link href={"/auth/login"}>Login</Link>
      </Button>
      <Button size={"sm"} className="active:scale-95 duration-200" asChild>
        <Link href={"/auth/register"}>Register</Link>
      </Button>
    </div>
  );
};

export default AuthBtn;
