import React from "react";

type Props = {
  children: React.ReactNode;
};

const FilterContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
      {children}
    </div>
  );
};

export default FilterContainer;
