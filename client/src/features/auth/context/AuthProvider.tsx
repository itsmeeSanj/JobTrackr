import React, { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { AuthContext } from "./AuthContext";
import type { User, AuthContextType } from "../../../types/auth.types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const isAuthenticated = !!user;
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  console.log("backendUrl:", backendUrl);

  const login = (userData: User) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      message.success("Logged out successfully");
      navigate("/login");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    backendUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
