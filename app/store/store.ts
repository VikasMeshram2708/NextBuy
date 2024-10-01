import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./product/productSlice";

export const store = configureStore({
  reducer: {
    [productSlice.reducerPath]: productSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
