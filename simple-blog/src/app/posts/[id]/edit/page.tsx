"use client";

import { getOldPost, updatePost } from "@/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface EditPageInterface {
  params: {
    id: string;
  };
}

export default function EditPage(props: EditPageInterface) {
  const postId = parseInt(props.params.id);

  const [oldPost, setOldPost] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  const [updateFormState, updateFormAction] = useFormState(updatePost, {
    message: "",
    id: postId,
  });

  const getOldData = async () => {
    const post = await getOldPost(postId);
    setOldPost(post);
  };

  useEffect(() => {
    getOldData();
  }, []);

  return (
    <section className="mt-12 md:mt-28 md:w-1/2 mx-auto font-mono">
      <h1 className=" text-center text-2xl md:text-3xl font-sans md:font-mono font-bold uppercase">
        Update Post
      </h1>
      <p className="text-center text-sm font-medium text-gray-600">
        update your post here.
      </p>
      {updateFormState.message && (
        <p className=" bg-red-500 text-white text-sm text-center py-2 mt-4">
          {updateFormState.message}
        </p>
      )}

      <form className=" mt-6" action={updateFormAction}>
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
            defaultValue={oldPost?.title}
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
            defaultValue={oldPost?.description}
            className="w-full p-2 block scroll-smooth outline-none rounded border border-gray-600 focus-visible:outline-none focus:ring-1 focus:ring-black focus:shadow-lg duration-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className=" bg-black text-white text-center w-full py-4 mt-4 md:text-lg font-bold rounded active:bg-black hover:bg-gray-800 active:ring-2 active:ring-gray-700 duration-200"
        >
          Update
        </button>
      </form>
    </section>
  );
}
