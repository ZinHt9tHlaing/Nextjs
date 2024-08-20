import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import AuthHeader from "./Auth-header";
import BackBtn from "./Back-btn";

interface CardWrapperProps {
  title: string;
  label: string;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  title,
  label,
  backHref,
  backLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card className=" md:w-[600px] shadow-md">
      <CardHeader>
        <AuthHeader title={title} label={label} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackBtn backHref={backHref} backLabel={backLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
