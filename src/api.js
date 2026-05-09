import axios from "axios";

const BASEAPI = axios.create({
  baseURL: "https://absgrobalbackend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});


BASEAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("absgrobaltkn");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



BASEAPI.interceptors.response.use(
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

export default BASEAPI;
