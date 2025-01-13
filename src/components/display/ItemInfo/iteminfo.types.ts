import { MouseEventHandler } from "react"

export interface IntemInfoProps {
  text: string
  displayIcon?: string
  actionIcon?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}
