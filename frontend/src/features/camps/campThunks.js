import {
    campsStart,
    campsSuccess,
    campSuccess,
    campsFailure
} from "./campSlice";

import {
    getAllCamps,
    getCampById,
    createCamp,
    updateCamp,
    deleteCamp
} from "../../api/campApi";

/* ===============================
   Fetch All Camps
================================ */

export const fetchCamps = () => async (dispatch) => {

    try {

        dispatch(campsStart());

        const data = await getAllCamps();

        dispatch(campsSuccess(data));

    }

    catch (error) {

        dispatch(

            campsFailure(

                error?.response?.data?.message ||

                "Failed to load camps."

            )

        );

    }

};

/* ===============================
   Fetch Camp By Id
================================ */

export const fetchCampById = (id) => async (dispatch) => {

    try {

        dispatch(campsStart());

        const data = await getCampById(id);

        dispatch(campSuccess(data));

    }

    catch (error) {

        dispatch(

            campsFailure(

                error?.response?.data?.message ||

                "Failed to load camp."

            )

        );

    }

};

/* ===============================
   Create Camp
================================ */

export const addCamp = (campData) => async (dispatch) => {

    try {

        dispatch(campsStart());

        await createCamp(campData);

        dispatch(fetchCamps());

    }

    catch (error) {

        dispatch(

            campsFailure(

                error?.response?.data?.message ||

                "Failed to create camp."

            )

        );

    }

};

/* ===============================
   Update Camp
================================ */

export const editCamp = (id, campData) => async (dispatch) => {

    try {

        dispatch(campsStart());

        await updateCamp(id, campData);

        dispatch(fetchCampById(id));

    }

    catch (error) {

        dispatch(

            campsFailure(

                error?.response?.data?.message ||

                "Failed to update camp."

            )

        );

    }

};

/* ===============================
   Delete Camp
================================ */

export const removeCamp = (id) => async (dispatch) => {

    try {

        dispatch(campsStart());

        await deleteCamp(id);

        dispatch(fetchCamps());

    }

    catch (error) {

        dispatch(

            campsFailure(

                error?.response?.data?.message ||

                "Failed to delete camp."

            )

        );

    }

};