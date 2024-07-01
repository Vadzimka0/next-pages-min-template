import Axios from "axios";

// import { notificationsStore } from "@/stores/notifications";
import { API_URL } from "@/config/constants";

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      return null;
    }

    const message = error.response?.data?.message || error.message;

    // notificationsStore.getState().showNotification({
    //   type: "error",
    //   title: "Error",
    //   duration: 5000,
    //   message,
    // });

    return Promise.reject(error);
  }
);
