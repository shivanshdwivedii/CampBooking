import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import campReducer from "../features/camps/campSlice";
import bookingReducer from "../features/bookings/bookingSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        camps: campReducer,

        bookings: bookingReducer,

        dashboard: dashboardReducer

    },

    devTools: import.meta.env.DEV

});