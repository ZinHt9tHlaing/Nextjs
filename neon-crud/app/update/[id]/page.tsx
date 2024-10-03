import CustomButton from "@/components/custom-button";
import { updateData } from "@/server/actions";

type EditTodoProps = {
  params: {
    id: string;
  };
};

const EditTodo = ({ params }: EditTodoProps) => {
  return (
    <main>
      <h2>Update todo</h2>
      <form action={updateData}>
        <input type="text" name="id" value={params.id} readOnly hidden />
        <input
          type="text"
          name="title"
          required
          className="bg-transparent border border-white"
        />
        <CustomButton label="Update todo" />
      </form>
    </main>
  );
};

export default EditTodo;
