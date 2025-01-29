import { ReactNode } from "react";

type PropsButtonModal = {
  appearance?: "normal" | "main";
};

export interface PropsModal {
  title: string;
  message?: string | string[];
  children?: ReactNode;
  buttons?: PropsButtonModal[] | null;
  defaultButtonText?: string;
  notOverflow?: boolean
}
