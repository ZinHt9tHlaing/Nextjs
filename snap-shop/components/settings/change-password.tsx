"use client";

import { KeyRound } from "lucide-react";
import SettingsCard from "./settings-card";
import AuthForm from "@/components/auth/auth-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { resetPasswordAction } from "@/server/actions/reset-password-action";
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { useAction } from "next-safe-action/hooks";

type ChangePasswordProps = {
  email: string;
};

const ChangePassword = ({ email }: ChangePasswordProps) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ? email : "",
    },
  });

  const { execute, status, result, isPending } = useAction(
    resetPasswordAction,
    {
      onSuccess({ data }) {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success, {
            action: {
              label: "Open Gmail",
              onClick: () => window.open("https://mail.google.com"),
            },
          });
        }
      },
    }
  );

  const handleOnSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const { email } = values;
    execute({
      email,
    });
  };

  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Change Password</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            {isPending ? (
              <Button
                className="w-full cursor-not-allowed"
                disabled={status === "executing"}
              >
                <p className="w-4 h-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin me-2"></p>
                <KeyRound className="size-5" />
              </Button>
            ) : (
              <Button className="w-full bg-primary">
                <KeyRound className="size-5" />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
