import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// console.log('pcc', `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/all`)
export const productSlice = createApi({
  reducerPath: "carouselProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_CAROUSEL,
  }),
  endpoints: (builder) => ({
    getCarouselProducts: builder.query<carouselProduct[], []>({
      query: () => "/products",
    }),

    getProductsCount: builder.query({
      query: () => `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/all`,
      transformResponse: (response: { products: cardProduct[] }) => {
        return response?.products?.length;
      },
    }),
  }),
});

export const { useGetCarouselProductsQuery, useGetProductsCountQuery } =
  productSlice;
