"use client";

import { createPost } from "@/actions";
import { useFormState } from "react-dom";

export default function Create() {
  const [createFormState,createPostAction] = useFormState(createPost, { message: "" });

  return (
    <section className="mt-12 md:mt-28 md:w-1/2 mx-auto font-mono">
      <h1 className=" text-center text-2xl md:text-3xl font-sans md:font-mono font-bold uppercase">
        Create Post
      </h1>
      <p className="text-center text-sm font-medium text-gray-600">
        create your own new post now.
      </p>

      {createFormState.message && (
        <p className=" bg-red-500 text-white text-sm text-center py-2 mt-4">
          {createFormState.message}
        </p>
      )}

      <form className=" mt-6" action={createPostAction}>
        <div className=" mb-4">
          <label
            htmlFor="title"
            className=" md:text-lg font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 block outline-none rounded border border-gray-600 focus-visible:outline-none focus:ring-1 focus:ring-black focus:shadow-lg duration-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className=" md:text-lg font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            rows={7}
            id="description"
            name="description"
            className="w-full p-2 block outline-none rounded border border-gray-600 focus-visible:outline-none focus:ring-1 focus:ring-black focus:shadow-lg duration-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className=" bg-black text-white text-center w-full py-4 mt-4 md:text-lg font-bold rounded hover:bg-gray-800 active:bg-black duration-200"
        >
          Post
        </button>
      </form>
    </section>
  );
}
