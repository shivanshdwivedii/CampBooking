import { createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",

  async (_, thunkAPI) => {
    try {
      const response = await dashboardApi.getDashboard();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load dashboard."
      );
    }
  }
);