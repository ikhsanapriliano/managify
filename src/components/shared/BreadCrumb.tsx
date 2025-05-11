import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({
  items,
}: {
  items: { title: string; link?: string }[];
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage className="font-semibold">
                {item.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <div key={index} className="flex items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
