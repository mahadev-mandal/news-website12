import axios from "axios";
import apiURL from "./apiURL.";

const axiosInstance = axios.create({
    baseURL: apiURL,
})

export default axiosInstance;