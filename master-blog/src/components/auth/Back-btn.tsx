import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackBtnProps {
  backHref: string;
  backLabel: string;
}

const BackBtn = ({ backHref, backLabel }: BackBtnProps) => {
  return (
    <Button variant={"link"} className=" w-full font-normal active:scale-95 duration-200" asChild>
      <Link href={backHref} className=" ms-2">
        {backLabel}
      </Link>
    </Button>
  );
};

export default BackBtn;
