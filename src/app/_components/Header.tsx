"use client";

import type { TRootState } from "@/store";
import {
  setIsDesktopOpen,
  setIsMobileOpen,
} from "@/store/slices/sidebar.slice";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import LogoutDialog from "./LogoutDialog";

const Header = () => {
  const dispatch = useDispatch();
  const { isDesktopOpen, isMobileOpen } = useSelector(
    (slice: TRootState) => slice.sidebar,
  );

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <button
        type="button"
        className="hidden cursor-pointer items-center outline-0 lg:flex"
        onClick={() => {
          dispatch(setIsDesktopOpen(!isDesktopOpen));
        }}
      >
        <LuMenu />
      </button>
      <button
        type="button"
        className="flex cursor-pointer items-center outline-0 lg:hidden"
        onClick={() => {
          dispatch(setIsMobileOpen(!isMobileOpen));
        }}
      >
        <LuMenu />
      </button>
      <LogoutDialog />
    </header>
  );
};

export default Header;
