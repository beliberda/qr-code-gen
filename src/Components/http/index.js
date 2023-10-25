import axios from "axios";

// export const API_URL = " http://127.0.0.1:8225/";
export const API_URL = "http://86.102.19.21:8225/";
// export const API_URL = "http://192.168.31.218/";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
