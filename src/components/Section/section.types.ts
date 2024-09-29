import { ReactNode } from "react"

interface PropsSectionImage {
  background: string
  viewImages?: string[]
}

interface PropsDescription {
  title: string
  text: string
  illustrationUrl: string
}

export interface PropsSection {
  id: string
  backgroundColor?: string
  sectionImage?: PropsSectionImage
  description?: PropsDescription
  observeAside?: boolean
  children?: ReactNode
}
