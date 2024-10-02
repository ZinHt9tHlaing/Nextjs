import CustomButton from "@/components/custom-button";
import { createData, readData } from "@/server/actions";
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
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
      <div className="">
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
