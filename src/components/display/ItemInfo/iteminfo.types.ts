import { MouseEventHandler } from "react"

export interface IntemInfoProps {
  text: string
  alternativeText?: string
  displayIcon?: string
  actionIcon?: string
  colorDark?: boolean
  typeAdd?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}
