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
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't u have an account?"
      footerHref="/auth/register"
      showProvider
    >
      <Form {...form}>
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
        <Button className="w-full mb-4">Login</Button>
      </Form>
    </AuthForm>
  );
};

export default Login;
