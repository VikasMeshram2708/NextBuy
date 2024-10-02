import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "carouselProducts",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_CAROUSEL,
  }),
  endpoints: (builder) => ({
    getCarouselProducts: builder.query<carouselProduct[], void>({
      query: () => "/products",
    }),

    getProductsCount: builder.query<number, void>({
      query: () => `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/all`,
      transformResponse: (response: { products: cardProduct[] }) => {
        return response?.products?.length;
      },
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (productDetails: cardProduct) => ({
        url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/add`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: productDetails,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetCarouselProductsQuery,
  useGetProductsCountQuery,
  useAddProductMutation,
} = productSlice;
