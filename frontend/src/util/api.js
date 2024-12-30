import axios from "axios";

export const BACKEND_API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    timeout: 60 * 1000,
})

/*
* Axios send Access Token
*/
BACKEND_API.interceptors.request.use(function (config) {

    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * Axios Response 
 */
BACKEND_API.interceptors.response.use(
    (response) => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Check if the error is a 401 and if it's not already trying to refresh
        if (error.response &&
            error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (error.response.data &&
                error.response.data.errors &&
                error.response.data.errors.name === "TokenExpiredError") {
                try {
                    /**
                     * TO DO: Refresh Token
                     */
                    // await refreshToken();

                    // return BACKEND_API(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }

        return error.response?.data ? Promise.reject(error.response.data) : Promise.reject(error);
    }
);