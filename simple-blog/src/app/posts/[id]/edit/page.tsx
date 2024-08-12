import { db } from "@/db";
import { notFound, redirect } from "next/navigation";

interface EditPageInterface {
  params: {
    id: string;
  };
}

export default async function EditPage(props: EditPageInterface) {
  const postId = parseInt(props.params.id);

  const oldPost = await db.post.findFirst({
    where: { id: postId },
  });

  if (!oldPost) {
    return notFound();
  }

  const updatePost = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await db.post.update({
      where: { id: postId },
      data: {
        title,
        description,
      },
    });

    redirect(`/posts/${oldPost.id}`);
  };

  return (
    <section className="mt-12 md:mt-28 md:w-1/2 mx-auto font-mono">
      <h1 className=" text-center text-2xl md:text-3xl font-sans md:font-mono font-bold uppercase">
        Update Post
      </h1>
      <p className="text-center text-sm font-medium text-gray-600">
        update your post here.
      </p>
      <form className=" mt-6" action={updatePost}>
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
