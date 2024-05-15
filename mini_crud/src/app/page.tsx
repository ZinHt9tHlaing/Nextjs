import { db } from "@/db";
import Link from "next/link";

export default async function Posts() {
  const posts = await db.post.findMany();
  return (
    <section className=" grid grid-cols-2 gap-3">
      {posts.map((post) => (
        <div key={post.id} className="shadow border border-gray-600 p-3">
          <h1 className="text-xl font-bold uppercase tracking-wide mb-3">
            {post.title}
          </h1>
          <Link
            href={`/post/${post.id}`}
            className="p-1 bg-black text-white text-sm font-medium hover:scale-105 active:scale-95 duration-200"
          >
            Read More
          </Link>
          <p className="text-xs text-gray-500 mt-3 line-clamp-4 tracking-widest">
            {post.description}
          </p>
        </div>
      ))}
    </section>
  );
}
