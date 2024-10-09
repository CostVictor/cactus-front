import { ReactNode } from "react";

export default interface PropsContainer {
  children: ReactNode
  className?: string
  animateChildren?: boolean
  grid?: boolean
}
