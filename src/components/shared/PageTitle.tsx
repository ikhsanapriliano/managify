import BreadCrumb from "./BreadCrumb";

type Props = {
  title: string;
  items: { title: string; link?: string }[];
};

const PageTitle = ({ title, items }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <BreadCrumb items={items} />
    </div>
  );
};

export default PageTitle;
