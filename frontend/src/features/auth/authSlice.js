import { createSlice } from "@reduxjs/toolkit";

/* =====================================
   Local Storage
===================================== */

const token = localStorage.getItem("token");

const user = localStorage.getItem("user");

/* =====================================
   Initial State
===================================== */

const initialState = {

    user: user
        ? JSON.parse(user)
        : null,

    token: token || null,

    isAuthenticated: !!token,

    loading: false,

    error: null

};

/* =====================================
   Slice
===================================== */

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        /* ==========================
           Login
        ========================== */

        loginStart(state) {

            state.loading = true;

            state.error = null;

        },

        loginSuccess(state, action) {

            state.loading = false;

            state.user = action.payload.user;

            state.token = action.payload.token;

            state.isAuthenticated = true;

            state.error = null;

            localStorage.setItem(

                "token",

                action.payload.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(action.payload.user)

            );

        },

        loginFailure(state, action) {

            state.loading = false;

            state.error = action.payload;

        },

        /* ==========================
           Register
        ========================== */

        registerStart(state) {

            state.loading = true;

            state.error = null;

        },

        registerSuccess(state) {

            state.loading = false;

            state.error = null;

        },

        registerFailure(state, action) {

            state.loading = false;

            state.error = action.payload;

        },

        /* ==========================
           Clear Error
        ========================== */

        clearAuthError(state) {

            state.error = null;

        },

        /* ==========================
           Logout
        ========================== */

        logout(state) {

            state.user = null;

            state.token = null;

            state.isAuthenticated = false;

            state.loading = false;

            state.error = null;

            localStorage.removeItem("token");

            localStorage.removeItem("user");

        }

    }

});

/* =====================================
   Actions
===================================== */

export const {

    loginStart,

    loginSuccess,

    loginFailure,

    registerStart,

    registerSuccess,

    registerFailure,

    clearAuthError,

    logout

} = authSlice.actions;

/* =====================================
   Selectors
===================================== */

export const selectAuth =

    (state) => state.auth;

export const selectCurrentUser =

    (state) => state.auth.user;

export const selectToken =

    (state) => state.auth.token;

export const selectIsAuthenticated =

    (state) => state.auth.isAuthenticated;

export const selectAuthLoading =

    (state) => state.auth.loading;

export const selectAuthError =

    (state) => state.auth.error;

/* =====================================
   Reducer
===================================== */

export default authSlice.reducer;