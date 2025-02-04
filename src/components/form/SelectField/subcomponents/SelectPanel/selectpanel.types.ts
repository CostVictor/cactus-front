import { Control, UseFormSetValue, FieldValues } from "react-hook-form";

export interface PropsSelectPanel {
  name: string
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>
  options: string[]
}
