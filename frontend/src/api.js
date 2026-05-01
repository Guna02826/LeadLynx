import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    const { url } = error.config || {};

    if (status === 401) {
      // Avoid redirection loops
      const isPublicPage = ["/login", "/register"].some((path) =>
        window.location.pathname.includes(path)
      );
      const isMeCheck = url?.includes("/users/me");

      if (!isPublicPage && !isMeCheck) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
