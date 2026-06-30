import axios from "axios";

const getApiBaseUrl = () => {
    const base = import.meta.env.VITE_API_BASE_URL;

    if (!base) {
        return "http://localhost:5121/api";
    }

    const trimmed = base.replace(/\/$/, "");

    return /\/api$/i.test(trimmed)
        ? trimmed
        : `${trimmed}/api`;
};

const api = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15000,
});

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (

            error.response?.status === 401

        ) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            if (

                window.location.pathname !== "/login"

            ) {

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }

);

export default api;