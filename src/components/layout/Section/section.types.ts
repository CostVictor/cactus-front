import { ReactNode } from "react"

interface PropsSectionImage {
  background: string
  viewImages?: string[]
}

interface PropsDescription {
  title: string
  text: string
  illustrationUrl: string | null
  illustrationDirection?: "left" | "right"
}

export interface PropsSection {
  id: string
  sectionImage?: PropsSectionImage
  description?: PropsDescription
  backgroundGray?: boolean
  reserveSidebarSpace?: boolean
  maxWidthContent?: boolean
  children?: ReactNode
}
