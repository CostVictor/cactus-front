import { MouseEventHandler } from "react"

export interface IntemInfoProps {
  text: string
  displayIcon?: string
  actionIcon?: string
  color?: "normal" | "dark"
  appearance?: "normal" | "add"
  onClick?: MouseEventHandler<HTMLDivElement>
}
