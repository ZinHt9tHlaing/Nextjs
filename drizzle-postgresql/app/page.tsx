import { createData, readData } from "@/server/actions";

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
        <p key={todo.id}>{todo.title}</p>
      ))}
      <div>
        <form action={createData}>
          <input
            type="text"
            name="todoTitle"
            className="bg-transparent border-2 px-2 border-white"
          />
          <button type="submit">Add new todo</button>
        </form>
      </div>
    </main>
  );
}
