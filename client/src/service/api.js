import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // add cookies with each request
});

export default axiosInstance;
