import { MouseEventHandler } from "react";
export interface PropsLink {
  text: string
  link: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
