import { db } from "@/db";

interface PostDetailsInterface {
  params: {
    id: string;
  };
}

export default async function PostDetails(props: PostDetailsInterface) {
  const posts = await db.post.findFirst({
    where: { id: parseInt(props.params.id) },
  });

    return <div>
      <h1>{posts?.title}</h1>
      <p>{posts?.description}</p>
  </div>;
}
