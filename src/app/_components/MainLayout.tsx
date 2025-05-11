"use client";

import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/store";
import DesktopSidebar from "./DesktopSidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <NuqsAdapter>
        <div className="flex min-h-screen">
          <DesktopSidebar />
          <div className="relative flex w-full flex-col overflow-hidden">
            <Header />
            <main className="relative flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {children}
            </main>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </NuqsAdapter>
    </Provider>
  );
};

export default MainLayout;
