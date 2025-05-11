import PageTitle from "@/components/shared/PageTitle";
import TransactionTable from "./_components/TransactionTable";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <PageTitle
        title="Finance"
        items={[{ title: "Home", link: "/" }, { title: "Finance" }]}
      />
      <TransactionTable />
    </Suspense>
  );
};

export default page;
