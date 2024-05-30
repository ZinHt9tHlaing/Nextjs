import { db } from "@/db";
import Link from "next/link";
import { FaCircleNotch } from "react-icons/fa";

export default async function Posts() {
  const posts = await db.post.findMany({orderBy:{id:"desc"}});
  return (
    <>
      {posts.length === 0 && (
        <h1 className=" text-center my-36 text-2xl font-bold">
          No data to show <span className="animate-pulse">...</span>
        </h1>
      )}
      <section className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="shadow border border-gray-600 p-3">
            <h2 className=" text-3xl font-bold mb-2 text-indigo-700">{post.id},</h2>
            <h1 className="text-2xl font-bold uppercase tracking-wide mb-3 line-clamp-3 md:line-clamp-2">
              {post.title}
            </h1>
            <Link
              href={`/posts/${post.id}`}
              className="p-1 bg-black text-white text-sm font-medium hover:scale-105 active:scale-95 duration-200"
            >
              Read More
            </Link>
            <p className="text-xs text-gray-500 mt-3 line-clamp-5 md:line-clamp-4 tracking-widest">
              {post.description}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
