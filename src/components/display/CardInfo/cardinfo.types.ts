import { MouseEventHandler } from "react"

export interface PropsCardInfo {
  title: string
  text?: string
  imgUrl?: string
  icon?: string
  isSoldOut?: boolean
  markerColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
