import MainLayout from "../_components/MainLayout";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <MainLayout>{children}</MainLayout>;
};

export default layout;
