"use client";

import { useFormStatus } from "react-dom";

type LabelProps = {
  label: string;
};

const CustomButton = ({ label }: LabelProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="border border-white block mt-2 p-1 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed active:scale-95 duration-200"
      disabled={pending}
    >
      {label || "Default"}
    </button>
  );
};

export default CustomButton;
