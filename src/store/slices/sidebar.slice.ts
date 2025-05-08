import type { TSidebarSlice } from "@/types/slice.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TSidebarSlice = {
  isDesktopOpen: true,
  isMobileOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsDesktopOpen: (state, action: PayloadAction<boolean>) => {
      state.isDesktopOpen = action.payload;
    },
    setIsMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileOpen = action.payload;
    },
  },
});

export const { setIsDesktopOpen, setIsMobileOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
