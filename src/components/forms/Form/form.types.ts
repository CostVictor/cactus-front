import { MouseEventHandler, ReactNode } from "react"
import { FieldValues } from "react-hook-form"

import { PropsFormatterData } from "@/utils/formatters"

export interface PropsForm<T = FieldValues> {
  children: ReactNode
  onSubmit: (data: T) => void
  isLoading?: boolean
  config?: {
    outputData?: PropsFormatterData
  }
}
