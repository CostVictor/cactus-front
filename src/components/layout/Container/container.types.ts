import { ReactNode } from "react";

export type PropGridColumns = 1 | 2 | 3 | 4 | 5

export default interface PropsContainer {
  children: ReactNode
  className?: string
  animateChildren?: boolean
  grid?: boolean | PropGridColumns
}
