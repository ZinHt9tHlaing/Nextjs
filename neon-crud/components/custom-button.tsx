"use client";

import { useFormStatus } from "react-dom";

type LabelProps = {
  label: string;
};

const CustomButton = ({ label }: LabelProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="border-2 border-blue-600 bg-blue-600 text-white mt-2 text-sm font-semibold rounded block p-1 disabled:bg-blue-500 disabled:text-gray-100 disabled:cursor-not-allowed active:scale-95 duration-200"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <p className="w-4 h-4 border-2 border-gray-100 border-t-transparent rounded-full animate-spin"></p>
          {label || "Default"}
        </div>
      ) : (
        label || "Default"
      )}
    </button>
  );
};

export default CustomButton;
