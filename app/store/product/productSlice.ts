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

    fetchCartProducts: builder.query<cartProducts[], void>({
      query: () => `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/all`,
      transformResponse: (response: { products: cartProducts[] }) => {
        return response?.products;
      },
      providesTags: ["Product"],
    }),

    fetchCardProducts: builder.query<cardProduct[], void>({
      query: () => `${process.env.NEXT_PUBLIC_CARD_PRODUCTS}`,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/product/delete`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: { productId },
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Product"],
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
  useFetchCartProductsQuery,
  useFetchCardProductsQuery,
  useDeleteProductMutation,
} = productSlice;
