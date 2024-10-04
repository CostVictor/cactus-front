"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { PropsUser, PropsAuthContext } from "./useauth.types";

const authContext = createContext<undefined | PropsAuthContext>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<null | PropsUser>({
    name: "Victor",
    role: "employee",
  });

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

export default useAuth;
