"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
        validateStatus: (status) => status === 200 || status === 401,
      });

      if (res.status === 200) {
        setUser(res.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      // Only log unexpected errors (not 401)
      if (error.response?.status !== 401) {
        console.error("Authentication check error:", error);
      }
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setAuthCheckCompleted(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setAuthCheckCompleted(true);
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    setIsLoggedIn(false);
    setAuthCheckCompleted(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        checkAuth,
        authCheckCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
