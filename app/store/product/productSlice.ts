import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "carouselProducts",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_CAROUSEL}),
  endpoints: (builder) => ({
    getCarouselProducts: builder.query<carouselProduct[], []>({
      query: () => "/products",
    }),
  }),
});

export const { useGetCarouselProductsQuery } = productSlice;
