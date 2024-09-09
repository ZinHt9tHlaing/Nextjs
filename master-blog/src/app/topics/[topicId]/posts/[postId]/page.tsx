import Time from "@/components/common/Time";
import CommentBox from "@/components/posts/Comment-box";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/db";
import paths from "@/lib/path";
import { ClipboardPlus, Clock, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type SinglePostProps = {
  params: {
    postId: string;
  };
};

const SinglePost = async ({ params }: SinglePostProps) => {
  const { postId } = params;

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      topic: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="mt-10">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">{post?.title}</h2>
          <Time date={post?.createdAt as Date} />
          <div className="py-2 flex gap-2 items-center">
            <Link href={paths.SingleTopic(post?.topicId as string)}>
              <div className="flex items-center gap-2">
                <ClipboardPlus className="size-4" />
                <p className="text-sm font-medium">{post?.topic.name}</p>
              </div>
            </Link>
            |
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <p className="text-sm font-medium">{post?.user.name}</p>
            </div>
          </div>
          <hr />
        </CardHeader>
        <CardContent>
          <p className="font-medium tracking-wide">{post?.content}</p>
        </CardContent>
      </Card>
      <CommentBox />
    </main>
  );
};

export default SinglePost;
