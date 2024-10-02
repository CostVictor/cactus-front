import { MouseEventHandler } from "react";

export interface PropsButton {
  text: string;
  appearance?: "normal" | "main"
  clicked?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>
}
