import CustomButton from "@/components/custom-button";
import { createData, deleteData, readData } from "@/server/actions";
import Image from "next/image";

export default async function Home() {
  const { error, success } = await readData();
  if (error) {
    throw new Error(error);
  }
  // console.log(success);

  return (
    <main>
      <h1 className="text-2xl font-bold">Todos</h1>
      {success?.map((todo) => (
        <div key={todo.id} className="flex items-center gap-1 my-3">
          <p>{todo.title}</p> -
          <form action={deleteData}>
            <input type="text" name="id" value={todo.id} hidden />
            <button className="underline p-1 text-red-600">Delete</button>
          </form>
        </div>
      ))}
      <div>
        <form action={createData}>
          <input
            type="text"
            name="todoTitle"
            className="bg-transparent border border-white"
          />
          <CustomButton />
        </form>
      </div>
    </main>
  );
}
