import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductSchema } from "../models/ProductSchema";
import toast from "react-hot-toast";

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
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data: addProductSchema) => {
    const { productId } = data;
    const res = await fetch("/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const result = await res.json();
    if (!res.ok) {
      toast.error(result?.message || "Failed to add product");
      throw new Error(result?.message || "Failed to add product");
    }
    toast.success(result?.message || "Added to Cart");
    return result;
  }
);

export const fetchProduct = createAsyncThunk("product/fetch", async () => {
  try {
    const res = await fetch("/api/product/all");
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result?.message || "Failed to Fetch Products");
    }
    return result?.products;
  } catch (error) {
    console.log(
      `Something went wrong. Failed to fetch user products :${error}`
    );
  }
});
export default productSlice.reducer;
