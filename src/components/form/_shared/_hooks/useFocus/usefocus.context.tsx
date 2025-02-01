import { createContext } from "react";
import { PropsFocusContext } from "./usefocus.types";

const focusContext = createContext<PropsFocusContext | null>(null);

export default focusContext;
