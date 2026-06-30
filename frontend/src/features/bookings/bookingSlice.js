import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    bookingStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    bookingSuccess: (state, action) => {
      state.loading = false;
      state.booking = action.payload;
    },

    bookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearBooking: (state) => {
      state.booking = null;
      state.error = null;
    },
  },
});

export const {
  bookingStart,
  bookingSuccess,
  bookingFailure,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;