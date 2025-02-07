import { TapInfo } from "framer-motion"

export interface PropsButton {
  text: string
  type?: "submit" | "button"
  appearance?: "default" | "principal"
  largeMode?: boolean
  onClick?: (event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo) => void
  formId?: string
  isLoading?: boolean
}
