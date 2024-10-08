import { ReactElement } from "react"
import { FieldValues } from "react-hook-form"
import { PropsInputField } from "../InputField"

export interface PropsForm {
  children: ReactElement<PropsInputField> | ReactElement<PropsInputField>[]
  onSubmit: (data: FieldValues) => void
}
