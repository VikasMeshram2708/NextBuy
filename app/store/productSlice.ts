import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductSchema } from "../models/ProductSchema";

type Props = {
  products: addProductSchema[];
};

const initialState: Props = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data: addProductSchema) => {
    const { productId } = data;
    console.log(JSON.stringify({ productId }));
    const res = await fetch("/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const result = await res.json();
    console.log("res", result);
    if (!res.ok) {
      throw new Error(result?.message || "Failed to add product");
    }
    return result;
  }
);
export default productSlice.reducer;
