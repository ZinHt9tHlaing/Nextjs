"use client"

import { createPost } from "@/app/actions";
import { useFormState } from "react-dom";

export default function Create() {
  const initialState = {
    message: "",
  };

  const [createFormState, createPostAction] = useFormState(
    createPost,
    initialState
  );

  return (
    <section className="mt-12 md:mt-24 md:w-1/2 mx-auto">
      <h2 className=" text-center text-3xl font-bold uppercase">Create Page</h2>
      <p className="text-center text-sm font-medium text-gray-400">
        Create Your Own New Post now
      </p>
      <form className=" mt-6" action={createPostAction}>
        {createFormState.message && (
          <p className=" text-red-500 text-center py-1 mt-4">{createFormState.message}</p>
        )}
        <div className=" mb-4">
          <label htmlFor="title" className=" text-lg font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" block border-2 border-gray-500 focus-visible:outline-none w-full p-2 active:scale-95 duration-700"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className=" text-lg font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={7}
            className=" block border-2 border-gray-500 focus-visible:outline-none w-full p-2 active:scale-95 duration-700"
          />
        </div>
        <button
          type="submit"
          className=" bg-black text-white w-full text-center py-4 mt-4 text-lg font-bold active:scale-95 duration-200"
        >
          Post
        </button>
      </form>
    </section>
  );
}
