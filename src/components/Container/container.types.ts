import { ReactNode } from "react";
import { Variants } from "framer-motion";

export default interface PropsContainer {
  children: ReactNode
  className?: string
  variants?: Variants
  isObserver?: boolean
}
