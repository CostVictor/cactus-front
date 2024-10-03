"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { PropsMobileContext } from "./usemobile.types";

const mobileContext = createContext<undefined | PropsMobileContext>(undefined);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useLayoutEffect(() => {
    /**
     * Define se está no modo mobile ou não a partir da largura da tela do navegador.
     */
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <mobileContext.Provider value={{ isMobile }}>
      {children}
    </mobileContext.Provider>
  );
};

const useMobile = () => {
  const context = useContext(mobileContext);
  if (context === undefined) {
    throw new Error("useMobile deve estar dentro de MobileProvider.");
  }
  return context;
};

export default useMobile;
