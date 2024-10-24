import { ReactNode } from "react";
import { PropsButton } from "@/components/commom/Button";

type ButtonModal = Omit<PropsButton, "link"> & {
  appearance?: "normal" | "main";
};

export interface PropsModal {
  title: string;
  message?: string | string[];
  children?: ReactNode;
  buttons?: ButtonModal[];
  defaultButtonText?: string;
}
