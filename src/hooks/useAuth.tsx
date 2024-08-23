"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const authContext = createContext<undefined | AuthContextType>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<null | User>(null);

  const login = (email: string, password: string) => {};
  const logout = () => {};

  return (
    <authContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth deve estar dentro de AuthProvider.");
  }
  return context;
};

export default useAuth
