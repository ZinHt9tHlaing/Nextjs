import { Clock } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

type TimeProps = {
  date: Date;
};

const Time = ({ date }: TimeProps) => {
  return (
    <div className="flex items-center gap-2">
      <Clock className="size-5" />
      <p className="text-sm font-medium">
        {formatDistanceToNow(new Date(date), {
          includeSeconds: true,
        })}{" "}
        ago ...
      </p>
    </div>
  );
};

export default Time;
