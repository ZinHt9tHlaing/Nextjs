import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Header from "./Header";

interface CardWrapperProps {
  title: string;
  label: string;
  children: React.ReactNode;
}

const CardWrapper = ({ title, label, children }: CardWrapperProps) => {
  return (
    <Card className=" md:w-[700px] shadow-md mt-10">
      <CardHeader>
        <Header title={title} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
