import { db } from "@/db";
import List from "./List";

const PostList = async () => {
  const posts = await db.post.findMany({
    include: {
      topic: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy:{
        createdAt: "desc"
    }
  });

  return (
    <main>
      {posts.map((post) => (
        <List
          key={post.id}
          title={post.title}
          username={post.user.name as string}
          postId={post.id}
          topicId={post.topicId}
          topicName={post.topic.name as string}
          date={post.createdAt}
        />
      ))}
    </main>
  );
};

export default PostList;
