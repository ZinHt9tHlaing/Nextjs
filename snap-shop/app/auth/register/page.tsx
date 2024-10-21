"use client";

import AuthForm from "@/components/auth/auth-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/types/register-schema";
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
import { useAction } from "next-safe-action/hooks";
import { registerAction } from "@/server/actions/register-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, status, result, isPending } = useAction(registerAction, {
    onSuccess({ data }) {
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
  });

  const handleOnSubmit = (values: z.infer<typeof registerSchema>) => {
    // const { name, email, password } = values;
    execute({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <AuthForm
      formTitle="Register a new account"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <div>
            {/* name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="snapshot" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>

          {/* <Button
            className={cn(
              "w-full my-4 bg-primary ",
              status === "executing" && "text-neutral-200"
            )}
          >
            Register
          </Button> */}
          {isPending ? (
            <Button
              className="w-full my-4 cursor-not-allowed"
              disabled={status === "executing"}
            >
              <p className="w-4 h-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin me-2"></p>
              Register
            </Button>
          ) : (
            <Button className="w-full my-4 bg-primary">Register</Button>
          )}
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
