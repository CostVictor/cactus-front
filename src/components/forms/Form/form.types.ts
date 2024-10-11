import { FieldValues } from "react-hook-form"
import { PropsInputField } from "../InputField"
import { ReactElement } from "react"

export interface PropsForm {
  children: ReactElement<PropsInputField> | ReactElement<PropsInputField>[]
  onSubmit: (data: FieldValues) => void
}
