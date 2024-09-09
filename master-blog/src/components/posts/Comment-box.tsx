"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscussSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { LoaderCircle, Send } from "lucide-react";

const CommentBox = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(DiscussSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmitHandler = (data: z.infer<typeof DiscussSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <main className="mt-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Discuss Area</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitHandler)}
              className=" space-y-6"
            >
              {/* Discuss */}
              <div className="">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discuss Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-gray-400"
                          placeholder="eg.I found a solution for you."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className="flex justify-end">
                  <Button
                    size={"lg"}
                    disabled={loading}
                    className=" bg-black mt-2 text-white active:scale-95 duration-200"
                  >
                    {loading ? (
                      <div className=" flex justify-center items-center">
                        <LoaderCircle className="rotate-90 me-2 animate-spin" />
                        <p className="animate-pulse">Requesting...</p>
                      </div>
                    ) : (
                      <div className=" pointer-events-auto flex justify-center items-center">
                        <Send />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CommentBox;
