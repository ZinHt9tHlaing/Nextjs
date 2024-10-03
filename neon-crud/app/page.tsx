import BlogCards from "@/components/blog-cards";
import { getPosts } from "@/server/actions";

export default async function Home() {
  const { error, success } = await getPosts();
  if (error) {
    throw new Error(error);
  }
  // console.log(success);

  return (
    <main className="mt-4">
      <h1 className="title-text mb-4">Recent Blogs</h1>
      {success?.length === 0 && (
        <p className="text-sm font-medium">No posts to show.</p>
      )}
      {success?.map((post) => (
        <BlogCards
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.description}
        />
      ))}
      <div className="mt-2">{/* <CreateForm /> */}</div>
    </main>
  );
}
