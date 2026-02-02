import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  console.log({ user });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
}
