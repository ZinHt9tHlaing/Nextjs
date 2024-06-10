import { db } from "@/db";

export default async function Posts() {
  const posts = await db.post.findMany();

  return (
    <section>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          {/* <p>{post.description}</p> */}
        </div>
      ))}
    </section>
  );
}
