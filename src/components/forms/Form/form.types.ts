import { ReactElement, MouseEventHandler } from "react"
import { FieldValues } from "react-hook-form"
import { PropsInputField } from "../InputField"

interface PropsFormButton {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export interface PropsForm {
  children: ReactElement<PropsInputField> | ReactElement<PropsInputField>[]
  onSubmit: (data: FieldValues) => void
  includeButton?: PropsFormButton
  defaultButtonSubmitText?: string
}
