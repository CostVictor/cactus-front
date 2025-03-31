import { useContext } from "react";

import focusContext from "./usefocus.context";

const useFocus = () => {
  const context = useContext(focusContext);

  if (!context) {
    throw new Error("useFocus deve ser usado dentro de um FocusProvider");
  }

  return context;
};

export default useFocus;
