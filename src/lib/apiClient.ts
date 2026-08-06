import axios from "axios";
import { useAuthDoctor } from "../stores/useAuthDoctor";

const BASE_URL: string = "http://localhost:5000";

export const publicApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
apiClient.interceptors.request.use(
  // config
  (config) => {
    const token = useAuthDoctor.getState().accessToken;
    if (config.headers) {
      const isPublicEndPoint = config.url?.includes("/auth/public");
      if (token && !isPublicEndPoint) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["X-App-Version"] = "1.0.0";
    }
    return config;
  },
  // error
  (error) => {
    return Promise.reject(error);
  },
);

// processing failure queue

let isRefreshing: boolean = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const preocessFailedQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// response interceptor

apiClient.interceptors.response.use(
  (response) => response,
  // in case of error
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // isRefreshing == true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      // isRefreshing == false
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await publicApiClient.post("/auth/refresh");
        const { user, accessToken } = response.data;
        useAuthDoctor.getState().setAuth(user, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        preocessFailedQueue(null, accessToken);
        apiClient(originalRequest);
      } catch (refreshError) {
        preocessFailedQueue(refreshError, null);
        useAuthDoctor.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
