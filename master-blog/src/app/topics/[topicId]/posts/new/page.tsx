"use client";

import CardWrapper from "@/components/topics/Card-wrapper";
import { PostSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPostHandler } from "@/lib/actions";

interface CreatePostProps {
  params: {
    topicId: string;
  };
}

const CreatePost = ({ params }: CreatePostProps) => {
  const { topicId } = params;

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
      topicId: topicId,
    },
  });

  const handleSubmitHandler = async (data: z.infer<typeof PostSchema>) => {
    setLoading(true);
    await createPostHandler(data);
  };

  return (
    <main>
      <CardWrapper
        title="Create new post"
        label={`create your own new post.`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitHandler)}
            className=" space-y-6"
          >
            <div className="space-y-4">
              {/* Hidden Form */}
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border-gray-400"
                        placeholder="Enter post title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
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
                <h1 className=" pointer-events-auto">Create Post</h1>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};

export default CreatePost;
