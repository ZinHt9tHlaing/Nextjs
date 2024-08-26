import { Button } from "../ui/button";
import { ClipboardPlus } from "lucide-react";
import Link from "next/link";

const AddBtn = () => {
  return (
    <div>
      <Button size={"sm"} className=" active:scale-95 duration-200" asChild>
        <Link href={"/topics/new"}>
          <ClipboardPlus className=" mr-2 size-4" />
          <span>Add New Topic</span>
        </Link>
      </Button>
    </div>
  );
};

export default AddBtn;
