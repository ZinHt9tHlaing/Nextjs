import { Button } from "@/components/ui/button";
import { handleGithubLogout } from "@/lib/actions";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <main className="flex justify-center items-center space-x-2">
      <form action={handleGithubLogout}>
        <Button variant={"destructive"} className="">
          Logout
        </Button>
      </form>
    </main>
  );
}
