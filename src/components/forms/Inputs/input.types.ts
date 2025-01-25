import { UseFormRegister, FieldValues } from "react-hook-form";
import { PropsConfigValidation } from "@/hooks/form/useValidation";
import { PropsConfigWriting } from "@/hooks/form/useWriting";
import { PropsTextFieldType } from "./TextField";

export type PropsAllTypes = PropsTextFieldType

export type PropsInputOnChange = (key: string, newValue: string) => void;

export interface PropsInputMessage {
  text: string
  isError?: boolean;
}

export interface PropsBaseInputConfig {
  initValue?: string
  bgDark?: boolean
  icon?: string
  validation?: PropsConfigValidation
  writing?: PropsConfigWriting
  control?: {
    register: UseFormRegister<FieldValues>
  }
};

export interface PropsBaseInput {
  name: string
  label: string
  inactive?: boolean
  required?: boolean
  toDisregard?: boolean
  onChange?: PropsInputOnChange
  message?: PropsInputMessage
  config?: PropsBaseInputConfig
}
