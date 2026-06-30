import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure
} from "./authSlice";

import {
    loginUser,
    registerUser
} from "../../api/authApi";

/* =====================================
   Register
===================================== */

export const register =

    (userData, navigate) =>

    async (dispatch) => {

        try {

            dispatch(registerStart());

            await registerUser(userData);

            dispatch(registerSuccess());

            navigate("/login");

        }

        catch (error) {

            dispatch(

                registerFailure(

                    error?.response?.data?.message ||

                    "Registration failed."

                )

            );

        }

    };

/* =====================================
   Login
===================================== */

export const login =

    (credentials, navigate) =>

    async (dispatch) => {

        try {

            dispatch(loginStart());

            const data = await loginUser(credentials);

            dispatch(

                loginSuccess({

                    token: data.token,

                    user: data

                })

            );

            if (

                data.roles?.includes("Admin")

            ) {

                navigate("/admin/manage-camps");

            }

            else {

                navigate("/");

            }

        }

        catch (error) {

            dispatch(

                loginFailure(

                    error?.response?.data?.message ||

                    "Login failed."

                )

            );

        }

    };