import { FieldValues, UseFormSetValue } from "react-hook-form"
import { PropsInputOnChange } from "../input.types";

export interface PropsFilterField {
  label: string;
  value?: string;
  onChange?: PropsInputOnChange;
  synchronize?: UseFormSetValue<FieldValues> | PropsInputOnChange;
}
