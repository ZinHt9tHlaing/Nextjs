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
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { resetPasswordAction } from "@/server/actions/reset-password-action";

const Login = () => {
  const { execute, status, result, isPending } = useAction(
    resetPasswordAction,
    {
      onSuccess({ data }) {
        console.log(data);
        form.reset();
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

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const { email } = values;
    execute({
      email,
    });
  };

  return (
    <AuthForm
      formTitle="Reset your Password"
      footerLabel="Already have an account?"
      footerHref="/auth/login"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <div>
            {/* email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="snapshop@gmail.com"
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

export default Login;
