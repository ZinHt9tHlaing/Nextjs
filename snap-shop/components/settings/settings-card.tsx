import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type SettingsCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const SettingsCard = ({ children, title, description }: SettingsCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          {title && description && (
            <>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </>
          )}
          {children}
        </CardHeader>
      </Card>
    </div>
  );
};

export default SettingsCard;
