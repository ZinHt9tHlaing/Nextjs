import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProviderLogin from "./provider-login";
import AuthFooter from "./auth-footer";

type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider,
  footerLabel,
  footerHref,
}: AuthFormProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {children} {showProvider && <ProviderLogin />}
        </CardContent>
        <CardFooter>
          <AuthFooter footerLabel={footerLabel} footerHref={footerHref} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
