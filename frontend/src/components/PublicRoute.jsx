import { Navigate } from "react-router";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
}
