"use client";

import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { twoFactorSchema } from "@/types/settings-schema";
import { useAction } from "next-safe-action/hooks";
import { twoFactorToggler } from "@/server/actions/settings";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

type TwoFactorProps = {
  isTwoFactorEnabled: boolean;
  email: string;
};

const TwoFactor = ({ isTwoFactorEnabled, email }: TwoFactorProps) => {
  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled,
      email,
    },
  });

  const { execute, isPending, status } = useAction(twoFactorToggler, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const handleOnSubmit = (values: z.infer<typeof twoFactorSchema>) => {
    const { isTwoFactorEnabled, email } = values;
    execute({
      isTwoFactorEnabled,
      email,
    });
  };

  return (
    <SettingsCard>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          {/* isTwoFactorEnabled */}
          <FormField
            name="isTwoFactorEnabled"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  <span className="font-medium">
                    {isTwoFactorEnabled ? "Disable" : "Enable"}
                  </span>{" "}
                  two factor Authentication for your account
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={status === "executing"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ring-1 ring-gray-600 duration-200"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className={cn(
              "w-full my-4 bg-primary duration-200",
              status === "executing" && "text-neutral-200",
              isTwoFactorEnabled
                ? "bg-red-600 hover:bg-red-500"
                : "bg-green-600"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </form>
      </Form>
    </SettingsCard>
  );
};

export default TwoFactor;
