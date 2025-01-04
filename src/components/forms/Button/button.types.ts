import { MouseEventHandler } from "react";

export interface PropsButton {
  text: string
  appearance?: "normal" | "main" | "submit"
  type?: "submit" | "button"
  clicked?: boolean
  noShadow?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
}
