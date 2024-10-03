import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./product/productSlice";
import { userSlice } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    [productSlice.reducerPath]: productSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productSlice.middleware,
      userSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
