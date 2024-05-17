import { db } from "@/db";
import { notFound, redirect } from "next/navigation";

interface EditInterface {
  params: {
    id: "string";
  };
}

export default async function EditPage(props: EditInterface) {
  const id = parseInt(props.params.id);

  const oldPost = await db.post.findFirst({
    where: { id },
  });

  if (!oldPost) {
    return notFound();
  }

  const updatePost = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await db.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
      
      redirect(`/posts/${id}`);
  };

  return (
    <section className="mt-12 w-full md:mt-24 md:w-1/2 mx-auto">
      <h2 className=" text-center text-3xl font-bold uppercase">Update Post</h2>
      <p className="text-center text-sm font-medium text-gray-400">
        update Your post here.
      </p>
      <form className=" mt-6" action={updatePost}>
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
