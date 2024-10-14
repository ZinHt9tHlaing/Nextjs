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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";

const Login = () => {
  const { execute, status, result, isPending } = useAction(login);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof loginSchema>) => {
    // const { email, password } = values;
    execute({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't u have an account?"
      footerHref="/auth/register"
      showProvider
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
                    <Input type="password" placeholder="******" {...field} />
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
