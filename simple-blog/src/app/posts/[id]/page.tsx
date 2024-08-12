import { db } from "@/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PostDetailsInterface {
  params: {
    id: string;
  };
}

export default async function PostDetails(props: PostDetailsInterface) {
  const postId = parseInt(props.params.id);

  const post = await db.post.findFirst({
    where: { id: postId },
  });

  // console.log(post)

  if (!post) {
    return notFound();
  }

  const deletePost = async () => {
    "use server";
    await db.post.delete({
      where: { id: postId },
    });
    redirect("/")
  };

  return (
    <div>
      <div className=" flex flex-col md:flex-row justify-between mt-10 mb-3">
        <h1 className=" tracking-wider text-2xl md:text-3xl uppercase font-bold mb-2 font-sans md:font-mono">
          {post?.title}
        </h1>
        <div className=" space-x-3">
          <Link
            href={`/posts/${post.id}/edit`}
            className="text-white bg-black rounded-md font-medium p-[11px] hover:bg-gray-700 active:ring-2 active:ring-gray-700 active:bg-black duration-200"
          >
            Edit
          </Link>
          <form className="inline" action={deletePost}>
            <button
              type="submit"
              className="text-white bg-red-600 rounded-md font-medium p-2 hover:bg-red-500 active:scale-95 duration-200"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <p className="tracking-wider sm:text-sm md:font-semibold font-serif">
        {post?.description}
      </p>
    </div>
  );
}
