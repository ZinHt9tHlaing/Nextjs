import { db } from "@/db";
import List from "./list";

type PostProps = {
  topicId: string;
};

const Post = async ({ topicId }: PostProps) => {
  const posts = await db.post.findMany({
    where: {
      topicId,
    },
    select: {
      id: true,
      title: true,
      topicId: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main>
      <h1 className="text-lg font-semibold my-4 mt-8">Recent Posts</h1>
      {posts.length === 0 && <p>There is no post to show.</p>}
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <List
            key={post.id}
            title={post.title}
            postId={post.id}
            topicId={topicId}
            username={post.user.name!}
          />
        ))}
      </div>
    </main>
  );
};

export default Post;
