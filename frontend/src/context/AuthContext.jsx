import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (storedUser && token) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", userData);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const demoLogin = async () => {
    try {
      const response = await api.post("/users/demo-login");
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", userData);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Demo login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/users/register", { name, email, password });
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", userData);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        demoLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
