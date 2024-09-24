/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProductSchema } from "../models/ProductSchema";
import toast from "react-hot-toast";

type ProductState = {
  products: addProductSchema[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  status: "idle", 
  error: null,
};

// Async thunk for adding a product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data: addProductSchema, { rejectWithValue }) => {
    try {
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
        return rejectWithValue(result?.message || "Failed to add product");
      }

      toast.success(result?.message || "Added to Cart");
      return result;
    } catch (error: any) {
      toast.error(error.message || "Failed to add product");
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);

// Async thunk for fetching products
export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/product/all");
      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result?.message || "Failed to fetch products");
      }
      return result?.products;
    } catch (error: any) {
      console.error(
        `Something went wrong. Failed to fetch products: ${error.message}`
      );
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

// Create product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle addProduct thunk
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<addProductSchema>) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload; // Set error message
      });

    // Handle fetchProduct thunk
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<addProductSchema[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload; // Set error message
      });
  },
});

// Export reducer
export default productSlice.reducer;
