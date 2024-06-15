import { db } from "@/db";
import Link from "next/link";

export default async function Posts() {
  const posts = await db.post.findMany();

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 gap-3">
      {posts.map((post) => (
        <div key={post.id} className=" border border-black p-3">
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
  );
}
