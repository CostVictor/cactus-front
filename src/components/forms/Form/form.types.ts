import { ReactElement, MouseEventHandler } from "react"
import { FieldValues } from "react-hook-form"

import { PropsFormatterData } from "@/utils/formatters"
import { PropsInputField } from "../InputField"

interface PropsFormButton {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export interface PropsForm {
  children: ReactElement<PropsInputField> | ReactElement<PropsInputField>[]
  onSubmit: (data: FieldValues) => void
  onChange?: (key: string, newValue: string) => void
  includeButton?: PropsFormButton
  defaultButtonSubmitText?: string
  defaultButtonSubmitAppearance?: "submit" | "main" | "normal"
  formatData?: PropsFormatterData
  isLoading?: boolean
}
