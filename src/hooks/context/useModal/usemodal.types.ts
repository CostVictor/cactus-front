import { ReactNode } from "react";

export interface PropsAddNewModalFunction {
  (modal: ReactNode): void;
}

export interface PropsRemoveModalFunction {
  (index: number): void;
}

export interface PropsModalContext {
  addNewModal: PropsAddNewModalFunction;
  removeModal: PropsRemoveModalFunction;
}
