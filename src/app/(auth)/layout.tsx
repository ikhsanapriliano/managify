import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const session = await auth();
  const userId = session?.user.id;

  if (userId) {
    redirect("/");
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default layout;
