import { ReactNode } from "react"

interface PropsDescription {
  title: string
  text: string
  illustrationUrl: string
}

export interface PropsSection {
  id: string
  image?: string | string[]
  description?: PropsDescription
  observeAside?: boolean
  children?: ReactNode
}
