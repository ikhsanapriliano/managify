import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>Dashboard Coming Soon!</p>
      <Link href={"/finance"} className="underline">
        Go To Finance
      </Link>
    </div>
  );
};

export default page;
