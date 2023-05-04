import axios from "axios";
import store from "../store";
import { authActions } from "../store/auth";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL,
});

// Request interceptors for API calls
axiosInstance.interceptors.request.use(
    (config) => {
        const user = store.getState()?.auth?.user;
        config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        config.headers["Role"] = user?.role;
        config.headers["Userid"] = user?._id;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // 200 type responses, this should be left as it is
        return response;
    },
    function (error) {
        // Handle your 440 error, maybe the UI changes and removing from local storage
        if (error?.response?.status === 440) {
            store.dispatch(authActions.logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
