"use client";

import AuthForm from "@/components/auth/auth-form";
import { loginSchema } from "@/types/login-schema";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);

  const { execute, status, result, isPending } = useAction(loginAction, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
      }
      if (data?.twoFactor) {
        toast.success(data?.twoFactor);
        setIsTwoFactorOn(true);
      }
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof loginSchema>) => {
    // const { email, password } = values;
    execute({
      email: values.email,
      password: values.password,
      code: values.code,
    });
  };

  return (
    <AuthForm
      formTitle={isTwoFactorOn ? "Place your code" : "Login to your account"}
      footerLabel="Don't u have an account?"
      footerHref="/auth/register"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          {isTwoFactorOn && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center text-xs">
                    We sent a code to your email.
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={status === "executing"}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {!isTwoFactorOn && (
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
              {/* password */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size={"sm"}
                variant={"link"}
                className="pl-0 mb-2 -transition-transform active:scale-95 duration-200"
                asChild
              >
                <Link href={"/auth/reset"}>Forgot password?</Link>
              </Button>
            </div>
          )}
          {/* <Button
            className={cn(
              "w-full my-4 bg-primary ",
              status === "executing" && "text-neutral-200"
            )}
          >
            {isTwoFactorOn ? "Verify Code" : "Login"}
          </Button> */}
          {isPending ? (
            <Button
              className="w-full my-4 cursor-not-allowed"
              disabled={status === "executing"}
            >
              <p className="w-4 h-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin me-2"></p>
              {isTwoFactorOn ? "Verify Code" : "Login"}
            </Button>
          ) : (
            <Button className="w-full my-4 bg-primary">
              {isTwoFactorOn ? "Verify Code" : "Login"}
            </Button>
          )}
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
