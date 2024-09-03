import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import paths from "@/lib/path";
import Time from "../common/Time";
import { User } from "lucide-react";

type ListProps = {
  title: string;
  username: string;
  postId: string;
  topicId: string;
  date: Date;
  topicName: string;
};

const List = ({
  title,
  username,
  postId,
  topicId,
  date,
  topicName,
}: ListProps) => {
  return (
    <Card className="relative mt-4">
      <CardHeader>
        <Link href={paths.SinglePost(topicId, postId)} className="mb-2">
          <h1 className="text-xl font-bold tracking-wide hover:underline duration-300">
            {title}
          </h1>
        </Link>
        <Time date={date} />
        <div className="flex items-center gap-1 mt-2">
          <User className="size-4" />
          <p className="text-sm font-medium">{username}</p>
        </div>
      </CardHeader>
      <p className="absolute top-0 right-0 p-2 bg-black text-white font-medium text-sm rounded-tr-md">
        {topicName}
      </p>
    </Card>
  );
};

export default List;
