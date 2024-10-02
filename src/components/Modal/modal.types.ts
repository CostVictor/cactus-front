import { ReactNode } from "react";
import { PropsButton } from "../Button";

type ButtonModal = Omit<PropsButton, "link"> & {
  aparence?: "normal" | "main";
};

export interface PropsModal {
  title: string;
  message?: string;
  children?: ReactNode;
  buttons?: ButtonModal[];
  defaultButtonText?: string;
}
