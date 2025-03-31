import { useState } from "react";

import focusContext from "./usefocus.context";
import { PropsFocusProvider } from "./usefocus.types";

export const FocusProvider = ({ children }: PropsFocusProvider) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <focusContext.Provider value={{ isFocused, setIsFocused }}>
      {children}
    </focusContext.Provider>
  );
};
