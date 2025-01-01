import { ReactNode } from "react";
import { PropsButton } from "@/components/forms/Button";

type PropsButtonModal = Omit<PropsButton, "link"> & {
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
