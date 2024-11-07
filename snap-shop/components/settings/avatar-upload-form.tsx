"use client";

import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { avatarSchema } from "@/types/settings-schema";
import { useAction } from "next-safe-action/hooks";
import { profileUpdateAction } from "@/server/actions/settings";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type AvatarUploadFormProps = {
  image: string | null;
  name: string;
  email: string;
};

const AvatarUploadForm = ({ image, name, email }: AvatarUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const { execute, status, result, isPending } = useAction(
    profileUpdateAction,
    {
      onSuccess({ data }) {
        form.reset();
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
        }
      },
    }
  );

  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image: image || undefined,
      email,
    },
  });

  const handleOnSubmit = (values: z.infer<typeof avatarSchema>) => {
    const { image, email } = values;
    execute({ image, email });
  };

  useEffect(() => {
    form.setValue("image", image!);
  }, [image, form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <div>
            {/* image */}
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center flex-col justify-center">
                  <Avatar className="size-14">
                    {form.getValues("image") && (
                      <AvatarImage
                        src={form.getValues("image")! || image!}
                        alt="profile"
                        className="mx-auto"
                      />
                    )}
                    {!form.getValues("image") && (
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <UploadButton
                    className="scale-75 ut-button:bg-primary ut-label:text-red-500 ut-button:ring-primary hover:ut-button:ring-primary"
                    endpoint={"imageUploader"}
                    onUploadBegin={() => {
                      setIsUploading(true);
                    }}
                    onUploadError={(error) => {
                      form.setError("image", {
                        type: "validate",
                        message: error.message,
                      });
                      setIsUploading(false);
                      return;
                    }}
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0].url!);
                      form.handleSubmit(handleOnSubmit)();
                      setIsUploading(false);
                      return;
                    }}
                    content={{
                      button({ ready }) {
                        if (ready) return <div>Upload Avatar</div>;
                        return (
                          <div className="animate-pulse">Uploading...</div>
                        );
                      },
                    }}
                  />
                  <FormControl>
                    <Input
                      type="hidden"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default AvatarUploadForm;
