import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  // console.log(session);

  return (
    <main className="flex justify-center items-center space-x-2 mt-10">
     <h1>Home Page</h1>
    </main>
  );
}
