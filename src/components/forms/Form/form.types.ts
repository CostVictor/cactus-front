import { FieldValues } from "react-hook-form"
import { ReactNode } from "react"

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];

export interface PropsForm {
  children: ReactNode
  onSubmit: (data: FieldValues) => void
  config?: {
    outputData?: PropsFormatterData
  }
}
