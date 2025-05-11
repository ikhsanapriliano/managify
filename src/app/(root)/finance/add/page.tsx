import AddFinanceForm from "./_components/AddFinanceForm";
import PageTitle from "@/components/shared/PageTitle";

const page = () => {
  return (
    <>
      <PageTitle
        title="Finance"
        items={[
          { title: "Home", link: "/" },
          { title: "Finance", link: "/finance" },
          { title: "Add" },
        ]}
      />
      <AddFinanceForm />
    </>
  );
};

export default page;
