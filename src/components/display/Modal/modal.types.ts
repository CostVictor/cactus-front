import { PropsButton } from "@/components/form/Button";
import { ReactNode } from "react";

export interface PropsModal {
  title: string;
  message?: string | string[];
  children?: ReactNode;
  buttons?: PropsButton[];
  defaultButtonText?: string;
  notOverflow?: boolean
  formMode?: boolean | "button" | "content"
}
