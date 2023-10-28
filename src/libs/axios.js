import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/utils/storage";
import axios, { isAxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  timeout: 50000,
});

axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();
    if (accessToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/sign-in-admin" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshTokenLocal = getRefreshToken();
          if (refreshTokenLocal) {
            const res = await axios.post(
              process.env.NEXT_PUBLIC_API_URL + "/auth/refresh",
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshTokenLocal}`,
                },
              }
            );
            const { accessToken } = res.data;
            setTokens({ accessToken });
          } else {
            clearTokens();
            window.location.href = "/auth/login";
          }
          return axiosClient(originalConfig);
        } catch (_error) {
          if (isAxiosError(_error)) {
            if (_error.response.status === 401) {
              clearTokens();
              window.location.href = "/auth/login";
            }
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;