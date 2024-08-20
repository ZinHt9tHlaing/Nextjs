import { db } from "@/db";
import Link from "next/link";

// export const dynamic = "force-dynamic";
export default async function Posts() {
  const posts = await db.post.findMany({ orderBy: { id: "desc" } });
  // console.log(posts)

  return (
    <>
      {posts.length < 1 && (
        <p className=" font-medium text-red-500 text-center my-36">
          No data to show.{" "}
          <Link
            href={"/posts/create"}
            className=" font-bold underline text-black hover:text-shadow-md duration-300"
          >
            Create post here
          </Link>
        </p>
      )}
      <section className=" grid grid-cols-1 md:grid-cols-2 gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className=" border border-black p-3 rounded hover:shadow-lg hover:ring-1 hover:ring-gray-700 duration-300"
          >
            <h4 className=" font-bold text-xl uppercase tracking-wide">
              {post.title}
            </h4>
            <p className=" line-clamp-3 my-2 tracking-widest font-mono text-gray-700">
              {post.description}
            </p>
            <Link
              href={`/posts/${post.id}`}
              className=" p-1 bg-black text-sm text-white font-medium hover:bg-gray-800 active:bg-black active:ring-2 active:ring-gray-700 duration-200"
            >
              read more
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
