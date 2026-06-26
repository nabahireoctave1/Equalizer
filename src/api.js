import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tkn");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (!error.response) {
      return Promise.reject({
        message: "something went wrong",
      });
    }

    if (error.response.status === 429) {

      const retryAfter = error.response.headers["retry-after"];

      return Promise.reject({
        message: retryAfter
          ? `Too many requests. Please try again in ${retryAfter} seconds.`
          : "Too many requests. Please slow down and try again shortly.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
