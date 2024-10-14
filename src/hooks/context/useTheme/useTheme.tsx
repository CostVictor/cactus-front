"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { PropsStorageTheme } from "./usetheme.types";

const StorageTheme = create<PropsStorageTheme>((set) => ({
  state: { isDark: false },
  actions: {
    toggleTheme: () =>
      set((storage) => {
        const newValue = !storage.state.isDark;
        localStorage.setItem("themeDark", String(newValue));
        document.body.classList.toggle("theme-dark", newValue);
        return { state: { isDark: newValue } };
      }),
  },
}));

const useTheme = () => {
  const {
    state: { isDark },
    actions: { toggleTheme },
  } = StorageTheme();

  useEffect(() => {
    const checkIsDark = localStorage.getItem("themeDark") === "true";
    document.body.classList.toggle("theme-dark", checkIsDark);

    if (isDark !== checkIsDark) {
      toggleTheme();
    }
  }, [isDark, toggleTheme]);

  return { isDark, toggleTheme };
};

export default useTheme;
