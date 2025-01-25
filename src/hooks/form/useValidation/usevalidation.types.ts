import { RegisterOptions } from "react-hook-form";
import { PropsAllTypes } from "@/components/forms/Inputs";

export interface PropsCustomValidation {
  [key: string]: PropsCustomValidation | RegisterOptions | ((arg: any) => RegisterOptions);
}

interface PropsOwnValidations {
  text: string
  exactlyTheSame?: boolean
}

export interface PropsConfigValidation {
  minLength?: number
  maxLength?: number
  own?: PropsOwnValidations
  custom?: PropsCustomValidation
}

export interface PropsUseValidation {
  type: PropsAllTypes
  config?: PropsConfigValidation
  required?: boolean
}
