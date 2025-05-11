"use client";

import { cn } from "@/lib/utils";
import type { TRootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const DesktopSidebar = () => {
  const isOpen = useSelector(
    (slice: TRootState) => slice.sidebar.isDesktopOpen,
  );

  return (
    <aside
      className={cn(
        "hidden min-h-screen w-[300px] shrink-0 flex-col border-r p-6 lg:flex",
        !isOpen && "lg:hidden",
      )}
    >
      <h1>Managify</h1>
    </aside>
  );
};

export default DesktopSidebar;
