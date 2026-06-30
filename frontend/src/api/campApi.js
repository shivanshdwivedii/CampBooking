import axios from "./axios";

/* ===========================
   Get All Camps
=========================== */

export const getAllCamps = async () => {

    const response = await axios.get("/camps");

    return response.data;

};

/* ===========================
   Get Camp By Id
=========================== */

export const getCampById = async (id) => {

    const response = await axios.get(`/camps/${id}`);

    return response.data;

};

/* ===========================
   Create Camp
=========================== */

export const createCamp = async (formData) => {
    const response = await axios.post("/camps", formData);
    return response.data;
};

/* ===========================
   Update Camp
=========================== */
export const updateCamp = async (id, formData) => {
    const response = await axios.put(`/camps/${id}`, formData);
    return response.data;
};

/* ===========================
   Delete Camp
=========================== */

export const deleteCamp = async (id) => {

    const response = await axios.delete(

        `/camps/${id}`

    );

    return response.data;

};

/* ===========================
   Search Camps
=========================== */

export const searchCamps = async (params) => {

    const response = await axios.get(

        "/camps/search",

        {
            params
        }

    );

    return response.data;

};