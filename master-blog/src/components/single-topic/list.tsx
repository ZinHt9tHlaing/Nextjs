import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import paths from "@/lib/path";
import { User } from "lucide-react";

type ListProps = {
  postId: string;
  topicId: string;
  title: string;
  username: string;
};

const List = ({ title, postId, topicId, username }: ListProps) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <Link href={paths.SinglePost(topicId, postId)} className="flex">
            <h2 className="text-xl font-bold text-left line-clamp-1 hover:underline duration-200">{title}</h2>
          </Link>
          <div className="flex items-center gap-1 mt-2">
            <User className="size-4" />
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default List;
