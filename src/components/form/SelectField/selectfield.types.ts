import { PropsBaseInput } from "../_shared/BaseInput";
import { PropsMessage } from "../_shared/_subcomponents/Message";
import { UseFormSetValue, FieldValues } from "react-hook-form"

export type PropsSelectField = Omit<PropsBaseInput, "type"> & {
  options: string[]
  setValue: UseFormSetValue<FieldValues>
  message?: PropsMessage
}
