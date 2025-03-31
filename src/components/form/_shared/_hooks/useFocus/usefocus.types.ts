import { ReactNode, Dispatch, SetStateAction } from "react";

export interface PropsFocusContext {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export interface PropsFocusProvider {
  children: ReactNode;
}
