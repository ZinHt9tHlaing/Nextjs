import { createPost } from "@/server/actions";
import React from "react";
import CustomButton from "./custom-button";

const CreateForm = () => {
  return (
    <form action={createPost}>
      <div className="space-y-4 mt-4">
        <input
          type="text"
          name="title"
          placeholder="title..."
          required
          className="bg-transparent border-2 w-full border-blue-600 px-2 py-1 rounded-md focus:outline-none focus:border-[3px] duration-100"
        />
        <textarea
          name="description"
          placeholder="description..."
          rows={4}
          required
          className="block w-full bg-transparent border-2 border-blue-600 px-2 py-1 rounded-md scroll-smooth focus:outline-none focus:border-[3px] duration-100"
        />
      </div>
      <div className="flex justify-start md:justify-end">
        <CustomButton label="Create new todo" />
      </div>
    </form>
  );
};

export default CreateForm;
