import { db } from "@/db";
import Link from "next/link";
import { badgeVariants } from "../ui/badge";
import paths from "@/lib/path";

const TopicLists = async () => {
  const topics = await db.topic.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  console.log(topics);

  return (
    <div>
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={paths.SingleTopic(topic.name)}
          className={badgeVariants({ variant: "outline" })}
        >
          {topic.name}
        </Link>
      ))}
    </div>
  );
};

export default TopicLists;
