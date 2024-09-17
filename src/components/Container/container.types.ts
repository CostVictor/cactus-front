import { ReactNode } from "react";

export default interface PropsContainer {
  children: ReactNode
  className?: string
  isObserver?: boolean
}
