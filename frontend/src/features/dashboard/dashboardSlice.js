import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./dashboardThunks";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboard(state) {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;