import { deletePost } from "@/server/actions";
import Link from "next/link";

type BlogCardProps = {
  id: number;
  title: string;
  description: string;
};

const BlogCards = ({ id, title, description }: BlogCardProps) => {
  return (
    <div className="mb-4 border-b-2 border-b-gray-300 pb-4">
      <p className="font-bold text-lg">{title}</p>
      <p className="text-gray-500">
        {description.slice(0, 120)}{" "}
        <Link href={`/post/${id}`} className="text-blue-600 font-medium">
          see more...
        </Link>
      </p>
    </div>
  );
};

export default BlogCards;
