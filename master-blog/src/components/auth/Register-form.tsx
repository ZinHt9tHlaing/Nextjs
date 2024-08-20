"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./Card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { log } from "console";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GithubIcon } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitHandler = (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <CardWrapper
      title="Register"
      label="register from here"
      backHref="/auth/login"
      backLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitHandler)}
          className=" space-y-6"
        >
          <div className=" space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-400"
                      placeholder="Enter your name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

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

            {/* ConfirmPassword */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
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
            {loading ? <p className=" animate-pulse">Requesting...</p> : "Register"}
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

export default RegisterForm;
