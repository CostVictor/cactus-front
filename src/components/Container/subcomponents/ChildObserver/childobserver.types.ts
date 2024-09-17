import { ReactNode, RefObject } from "react";

export default interface PropsChildObserver {
  children: ReactNode
  containerRef: RefObject<Element>
}
