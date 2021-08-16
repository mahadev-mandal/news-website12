import axios from "axios";

const apiURL = "https://news-website12.herokuapp.com";  //https://news-website12.herokuapp.com  or http://localhost:8000

const axiosInstance = axios.create({
  baseURL: apiURL,
})
export default axiosInstance;
export { apiURL };