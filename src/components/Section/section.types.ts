import { ReactNode } from "react"

interface PropsSectionImage {
  background: string
  viewImages?: string[]
}

interface PropsDescription {
  title: string
  text: string
  illustrationUrl: string
  illustrationDirection?: "left" | "right"
}

export interface PropsSection {
  id: string
  isBackgroundGray?: boolean
  sectionImage?: PropsSectionImage
  description?: PropsDescription
  observeAside?: boolean
  children?: ReactNode
}
