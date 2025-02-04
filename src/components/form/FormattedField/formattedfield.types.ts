import { UseFormSetValue, FieldValues } from "react-hook-form"
import { PropsMessage } from "../_shared/_subcomponents/Message"
import { PropsBaseInput } from "../_shared/BaseInput"
import { writingFormatters } from "../_shared/variables"

export type PropsFormattedField = PropsBaseInput & {
  type: keyof typeof writingFormatters
  setValue: UseFormSetValue<FieldValues>
  message?: PropsMessage
}
