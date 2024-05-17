import { db } from "@/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PostDetailsInterface {
  params: {
    id: string;
  };
}
export default async function PostDetails(props: PostDetailsInterface) {
  await new Promise((r) => setTimeout(r, 3000));
  const id = parseInt(props.params.id);

  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    return notFound();
  }

  const deletePost = async () => {
    "use server";

    await db.post.delete({
      where: { id },
    });
    redirect("/");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-2">
        <h1 className="text-3xl font-bold tracking-wider mb-2 uppercase">
          {post?.title}
        </h1>
        <div className=" space-x-3">
          <Link
            href={`/posts/${post?.id}/edit`}
            className=" bg-black text-white p-3 active:scale-95 duration-200"
          >
            Edit
          </Link>
          <form action={deletePost} className="inline">
            <button className=" bg-black text-white p-2 active:scale-95 duration-200">
              Delete
            </button>
          </form>
        </div>
      </div>
      <p className="text-sm text-gray-500 tracking-wider">
        {post?.description}
      </p>
    </div>
  );
}
