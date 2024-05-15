import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostDetailsInterface {
  params: {
    id: string;
  };
}
export default async function PostDetails(props: PostDetailsInterface) {
  await new Promise((r) => setTimeout(r, 3000));
  const post = await db.post.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-wider mb-2 uppercase">{post?.title}</h1>
      <p className="text-sm text-gray-500 tracking-wider">{post?.description}</p>
    </div>
  );
}
