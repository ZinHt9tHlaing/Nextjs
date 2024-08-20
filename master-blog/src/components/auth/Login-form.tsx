"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./Card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import { format } from "node:path/win32";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { GithubIcon } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitHandler = (data: z.infer<typeof LoginSchema>) => {
    setLoading(true)
    console.log(data);
  };

  return (
    <CardWrapper
      title="Login"
      label="login from here"
      backHref="/auth/register"
      backLabel="Already have an account? Register here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitHandler)}
          className=" space-y-6"
        >
          <div className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="border-gray-400"
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="border-gray-400"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button
            size={"lg"}
            disabled={pending}
            className="w-full bg-gray-700 text-white active:scale-95 duration-200"
          >
            {loading ? <p className=" animate-pulse">Requesting...</p> : "Login"}
          </Button>
        </form>
      </Form>
      <p className="my-4 text-muted-foreground text-center text-sm">or</p>
      <Button className="bg-black w-full hover:bg-gray-900 active:scale-95 duration-200">
        <GithubIcon className="mr-2 h-4 w-4" /> Continue with Github
      </Button>
    </CardWrapper>
  );
};

export default LoginForm;
