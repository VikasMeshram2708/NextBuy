import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk<User, void>(
  "user/fetchUser",
  async () => {
    const res = await fetch("/api/user/me");
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch Profile");
    }
    // console.log("ures", result);
    return result?.user;
  }
);

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

// Export reducer
export default userSlice.reducer;
