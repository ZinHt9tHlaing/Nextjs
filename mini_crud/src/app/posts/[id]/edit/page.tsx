"use client";

import { getOldPost, updatePost } from "@/app/actions";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface EditInterface {
  params: {
    id: "string";
  };
}

export default function EditPage(props: EditInterface) {
  const [oldPost, setOldPost] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  const id = parseInt(props.params.id);

  const [editFormState, editFormAction] = useFormState(updatePost, {
    message: "",
    id,
  });

  const getOldData = async () => {
    const post = await getOldPost(id);
    setOldPost(post);
  };

  useEffect(() => {
    getOldData();
  }, []);

  return (
    <section className="mt-12 w-full md:mt-24 md:w-1/2 mx-auto">
      <h2 className=" text-center text-3xl font-bold uppercase">Update Post</h2>
      <p className="text-center text-sm font-medium text-gray-400">
        update Your post here.
      </p>
      {editFormState.message && (
        <p className=" text-red-500 text-center py-1 mt-4">
          {editFormState.message}
        </p>
      )}
      <form className=" mt-6" action={editFormAction}>
        <div className=" mb-4">
          <label htmlFor="title" className=" text-lg font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={oldPost?.title}
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
            defaultValue={oldPost?.description}
            className=" block border-2 border-gray-500 focus-visible:outline-none w-full p-2 active:scale-95 duration-700"
          />
        </div>
        <button
          type="submit"
          className=" bg-black text-white w-full text-center py-4 mt-4 text-lg font-bold active:scale-95 duration-200"
        >
          Update
        </button>
      </form>
    </section>
  );
}
