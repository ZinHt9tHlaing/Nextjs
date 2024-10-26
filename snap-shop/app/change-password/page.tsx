"use client";

import AuthForm from "@/components/auth/auth-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { changePasswordSchema } from "@/types/change-password";
import { changePasswordAction } from "@/server/actions/change-password";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { execute, status, result, isPending } = useAction(
    changePasswordAction,
    {
      onSuccess({ data }) {
        console.log(data);
        form.reset();
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          signOut({ callbackUrl: "/auth/login" });
          toast.success(data?.success);
        }
      },
    }
  );

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    const { password } = values;
    execute({
      password,
      token,
    });
  };

  return (
    <AuthForm
      formTitle="Change your password"
      footerLabel="Already have an account?"
      footerHref="/auth/login"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <div>
            {/* email */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="****"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button
            className={cn(
              "w-full my-4 bg-primary ",
              status === "executing" && "text-neutral-200"
            )}
          >
            Login
          </Button> */}
          {isPending ? (
            <Button
              className="w-full my-4 cursor-not-allowed"
              disabled={status === "executing"}
            >
              <p className="w-4 h-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin me-2"></p>
              Login
            </Button>
          ) : (
            <Button className="w-full my-4 bg-primary">Login</Button>
          )}
        </form>
      </Form>
    </AuthForm>
  );
};

export default ChangePassword;
