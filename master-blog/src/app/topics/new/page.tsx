"use client";

import CardWrapper from "@/components/topics/Card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TopicSchema } from "@/schema";
import { z } from "zod";
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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createTopicHandler } from "@/lib/actions";
import { toast } from "sonner";

const CreateTopic = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(TopicSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });

  const handleSubmitHandler = async (data: z.infer<typeof TopicSchema>) => {
    setLoading(true);
    try {
      await createTopicHandler(data);
      setLoading(false);
    } catch (error: unknown) {
      toast("Something went wrong", {
        description: "Please try again later.",
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <section>
      <CardWrapper title="Create New Topic" label="create your own topic now.">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitHandler)}
            className=" space-y-6"
          >
            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border-gray-400"
                        placeholder="Typescript"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-400"
                        placeholder="https://example.com/image.jpg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="border-gray-400"
                        placeholder="Enter your description here."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <Button
              size={"lg"}
              disabled={loading}
              className="w-full bg-gray-700 text-white active:scale-95 duration-200"
            >
              {loading ? (
                <p className=" animate-pulse pointer-events-none cursor-not-allowed">
                  Requesting...
                </p>
              ) : (
                <h1 className=" pointer-events-auto">Create Topic</h1>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default CreateTopic;
