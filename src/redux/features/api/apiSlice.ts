// src/features/api/apiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiManager } from "../../../api/api-manager";
import { initializeApiManager } from "./apiAsyncThunk";

interface ApiState {
  apiManager: ApiManager | null;
  isLoading: boolean;
}

const initialState: ApiState = {
  apiManager: null,
  isLoading: true,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setApiManager(state, action: PayloadAction<ApiManager>) {
      state.apiManager = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeApiManager.fulfilled, (state, action) => {
      state.apiManager = action.payload;
      state.isLoading = false;
    });
    builder.addCase(initializeApiManager.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initializeApiManager.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setApiManager, setLoading } = apiSlice.actions;

export default apiSlice.reducer;
