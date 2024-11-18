import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiManager } from "../../../api/api-manager";
import { getOidc } from "../../../oidc/oidc";

export const initializeApiManager = createAsyncThunk(
  "api/initializeApiManager",
  async () => {
    const oidc = await getOidc(); // Fetch OIDC
    const apiManager = new ApiManager();
    await apiManager.initialize({ oidc }); // Initialize ApiManager
    return apiManager;
  }
);
