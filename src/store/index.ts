import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebar.slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
