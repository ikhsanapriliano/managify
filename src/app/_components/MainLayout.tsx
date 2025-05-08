"use client";

import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/store";
import DesktopSidebar from "./DesktopSidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen">
        <DesktopSidebar />
        <div className="w-full">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Provider>
  );
};

export default MainLayout;
