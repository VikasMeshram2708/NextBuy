import { ContactSchema } from "@/app/models/ContactSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "UserContact",
  tagTypes: ["Contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  endpoints: (builder) => ({
    handleContact: builder.mutation({
      query: (data: ContactSchema) => ({
        url: "/contact",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      transformResponse: (response: { message: string }) => {
        return response?.message;
      },
    }),
  }),
});

export const { useHandleContactMutation } = userSlice;
