"use client";

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
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { settingsSchema } from "@/types/settings-schema";
import { updateDisplayNameAction } from "@/server/actions/settings";

type ProfileFormProps = {
  name: string;
  email: string;
  setIsOpen: () => void;
};

const ProfileForm = ({ name, email, setIsOpen }: ProfileFormProps) => {
  const { execute, status, result, isPending } = useAction(
    updateDisplayNameAction,
    {
      onSuccess({ data }) {
        form.reset();
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          setIsOpen();
          toast.success(data?.success);
        }
      },
    }
  );

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const handleOnSubmit = (values: z.infer<typeof settingsSchema>) => {
    const { name, email } = values;
    execute({ name, email });
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4 px-4 lg:px-0"
        >
          <div>
            {/* email */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"snapShop@admin"}
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
              Save
            </Button>
          ) : (
            <Button className="w-full my-4 bg-primary">Save</Button>
          )}
        </form>
      </Form>
    </main>
  );
};

export default ProfileForm;
