import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    camps: [],

    selectedCamp: null,

    loading: false,

    error: null

};

const campSlice = createSlice({

    name: "camps",

    initialState,

    reducers: {

        /* ===========================
           Loading
        =========================== */

        campsStart(state) {

            state.loading = true;

            state.error = null;

        },

        /* ===========================
           Get All Camps
        =========================== */

        campsSuccess(state, action) {

            state.loading = false;

            state.camps = action.payload;

        },

        /* ===========================
           Get Single Camp
        =========================== */

        campSuccess(state, action) {

            state.loading = false;

            state.selectedCamp = action.payload;

        },

        /* ===========================
           Error
        =========================== */

        campsFailure(state, action) {

            state.loading = false;

            state.error = action.payload;

        },

        /* ===========================
           Clear Selected Camp
        =========================== */

        clearSelectedCamp(state) {

            state.selectedCamp = null;

        },

        /* ===========================
           Clear Error
        =========================== */

        clearCampError(state) {

            state.error = null;

        },

        /* ===========================
           Reset State
        =========================== */

        resetCampState(state) {

            state.camps = [];

            state.selectedCamp = null;

            state.loading = false;

            state.error = null;

        }

    }

});

export const {

    campsStart,

    campsSuccess,

    campSuccess,

    campsFailure,

    clearSelectedCamp,

    clearCampError,

    resetCampState

} = campSlice.actions;

export default campSlice.reducer;