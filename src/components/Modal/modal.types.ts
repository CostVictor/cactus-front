import { ReactNode } from "react";
import { PropsButton } from "../Button";

type ButtonModal = Omit<PropsButton, "link"> & {
  aparence?: "normal" | "main";
};

export default interface PropsModal {
  title: string;
  children: ReactNode;
  buttons?: ButtonModal[];
  defaultButtonText?: string;
}
