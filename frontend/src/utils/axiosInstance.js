import axios from "axios";

import {BASE_URL} from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            if(error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error("Unauthorized access - redirecting to login");
                window.location.href = "/"; // Adjust the path as needed
            }else if(error.response.status === 500) {
                // Handle server error
                console.error("Server error - please try again later");
            }
        }else if(error.code === "ECONNABORTED") {
            // Handle timeout error
            console.error("Request timed out - please try again later");
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;