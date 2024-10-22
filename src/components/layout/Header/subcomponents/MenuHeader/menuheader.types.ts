import { PropsHeader } from "../../header.types";

export type PropsMenuHeader = PropsHeader & {
  isAuthenticated: boolean
  removeModal: (index: number) => void
}
