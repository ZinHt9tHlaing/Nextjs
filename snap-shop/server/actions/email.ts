"use server";

import EmailConfirmationTemplate from "@/components/email-template";
import ResetPasswordEmail from "@/components/password-reset-email-template";
import TwoFactorMail from "@/components/two-factor-mail";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";

const currentBaseUrl = getBaseUrl();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  expireToken: string,
  userFirstName: string
) => {
  const confirmLink = `${currentBaseUrl}/confirm-email?token=${expireToken}`;

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

// ----------------------- reset password -------------------------

export const sendPasswordResetEmail = async (
  email: string,
  expireToken: string
) => {
  const resetLink = `${currentBaseUrl}/change-password?token=${expireToken}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password - Alert from SnapShop",
    react: ResetPasswordEmail({ resetPasswordLink: resetLink }),
  });

  if (error) {
    console.log(error);
  }
};

// ----------------------- two factor -------------------------

export const sendTwoFactorEmail = async (email: string, code: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication Code - SnapShop",
    react: TwoFactorMail({ code }),
  });

  if (error) {
    console.log(error);
  }
};
