import PostList from "@/components/posts/Post-list";
import TopicLists from "@/components/topics/Topic-lists";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  // console.log(session);

  return (
    <main className="flex justify-center items-center space-x-2 mt-10">
      <div className=" grid grid-cols-3 w-full gap-4">
        <div className="col-span-2">
          <h1 className="font-medium tracking-wide mb2">Recent Posts</h1>
          <PostList />
        </div>
        <div className="col-span-1">
          <h1 className="font-medium tracking-wide mb-3">Recent Topics</h1>
          <TopicLists />
        </div>
      </div>
    </main>
  );
}
