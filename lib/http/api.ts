import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/auth/refresh`,
    {},
    { withCredentials: true }
  );
};

//response interceptor to refresh token on receiving token expired error

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // const headers = { ...originalRequest.headers };

    if (error?.response?.status === 401 && !originalRequest._retry) {
      try {
        await refreshToken();
        originalRequest._retry = true;
        return axios.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

const ORDER_SERVICE_PREFIX = "/api/order";

export const getCustomer = () => api.get(`${ORDER_SERVICE_PREFIX}/customer`);
