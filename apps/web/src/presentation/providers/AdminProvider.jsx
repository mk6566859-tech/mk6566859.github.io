import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if already logged in (from localStorage)
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("adminLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
