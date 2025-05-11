"use client";

import type { SetValues } from "nuqs";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

const SearchFilter = ({
  placeholder,
  field,
  value,
  setValues,
}: {
  placeholder: string;
  field: string;
  value: string | null;
  setValues: SetValues<any>;
}) => {
  const [search, setSearch] = useState<string>(value ?? "");
  const setSearchDebounce = useDebouncedCallback((val) => {
    setValues((prev) => ({
      ...prev,
      [field]: val,
    }));
  }, 500);

  return (
    <div className="flex h-[45px] w-full items-center gap-2 rounded-lg border px-3 md:w-[280px]">
      <LuSearch size={20} className="text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full min-w-0 focus:outline-none"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyUp={() => {
          setSearchDebounce(search);
        }}
      />
    </div>
  );
};

export default SearchFilter;
