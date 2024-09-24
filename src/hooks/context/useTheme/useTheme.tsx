"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PropsThemeContext } from "./usetheme.types";

const themeContext = createContext<undefined | PropsThemeContext>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const themeDark = localStorage.getItem("themeDark");
    setIsDark(themeDark === "true");
  }, []);

  const toggleTheme = () =>
    setIsDark((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("themeDark", String(newValue));
      return newValue;
    });

  return (
    <themeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme deve estar dentro de ThemeProvider.");
  }
  return context;
};

export default useTheme;
