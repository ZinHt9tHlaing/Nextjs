import CustomButton from "@/components/custom-button";
import { getDetailPost, updatePost } from "@/server/actions";

type EditTodoProps = {
  params: {
    id: string;
  };
};

const EditTodo = async ({ params }: EditTodoProps) => {
  const { title, description } = await getDetailPost(Number(params.id));

  return (
    <main className="mt-4">
      <h2 className="title-text">Update todo</h2>
      <form action={updatePost}>
        <input type="text" name="id" value={params.id} readOnly hidden />
        <div className="space-y-4 mt-4">
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="title..."
            required
            className="bg-transparent border-2 w-full border-blue-600 px-2 py-1 rounded focus:outline-none focus:border-[3px] duration-100"
          />
          <textarea
            name="description"
            placeholder="description..."
            rows={4}
            defaultValue={description}
            required
            className="block w-full bg-transparent border-2 border-blue-600 px-2 py-1 rounded scroll-smooth focus:outline-none focus:border-[3px] duration-100"
          />
        </div>
        <div className="flex justify-start md:justify-end">
          <CustomButton label="Update todo" />
        </div>
      </form>
    </main>
  );
};

export default EditTodo;
