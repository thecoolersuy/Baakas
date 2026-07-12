import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    //we will attach auth token here in future
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access, Redirect to Login page");
    }
    if (error.response?.status >= 500) {
      console.warn("Server error, Show error page");
    }
    return Promise.reject(error);
  },
);
