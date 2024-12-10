import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/", // Replace with your API URL
  timeout: 5000,
  headers: {
      "Content-Type": 'application/json'
  }
});

// Axios Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //   const token = await user.getIdToken();
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios Response Interceptor (Optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
