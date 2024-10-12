import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ShoppingBasket } from "lucide-react";
import * as React from "react";

interface EmailConfirmationTemplateProps {
  userFirstName?: string;
  confirmEmailLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailConfirmationTemplate = ({
  userFirstName,
  confirmEmailLink,
}: EmailConfirmationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm Your Account - Welcome to SnapShop</Preview>
      <Body style={main}>
        <Container style={container}>
          <ShoppingBasket width={40} height={40} />
          <Section>
            <Text style={text}>Hi {userFirstName},</Text>
            <Text style={text}>
              Welcome to SnapShop! We're excited to have you on board. Please
              confirm your email address by clicking the link below:
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Confirm your Account
            </Button>
            <Text style={text}>
              If you did not create an account with us, please ignore this
              email.
            </Text>
            <Text style={text}>hanks, The SnapShop team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailConfirmationTemplate.PreviewProps = {
  userFirstName: "SnapShop",
  resetPasswordLink: "https://codehubmm.com",
} as EmailConfirmationTemplateProps;

export default EmailConfirmationTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
