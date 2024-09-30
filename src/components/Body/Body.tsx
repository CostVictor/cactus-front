"use client";

import useTheme from "@/hooks/context/useTheme";
import { averiaSansLibre } from "@/styles/fonts";
import { ModalProvider } from "@/hooks/context/useModal";
import { PropsBody } from "./body.types";

const Body = ({ children }: PropsBody) => {
  const theme = useTheme();

  return (
    <body
      className={`${averiaSansLibre.className} ${
        theme.isDark ? "theme-dark" : ""
      }`.trim()}
    >
      <ModalProvider>{children}</ModalProvider>
    </body>
  );
};

export default Body;
