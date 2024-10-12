"use server";

import EmailConfirmationTemplate from "@/components/email-template";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";

const currentBaseUrl = getBaseUrl();

export const sendEmail = async (
  email: string,
  expireToken: string,
  userFirstName: string
) => {
  const confirmLink = `${currentBaseUrl}/confirm-email?token=${expireToken}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Account - Welcome to SnapShop",
    react: EmailConfirmationTemplate({
      userFirstName,
      confirmEmailLink: confirmLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};
