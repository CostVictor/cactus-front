import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";
import { PropsWritingValidations, PropsWritingCapitalize } from "@/hooks/formatter/useWriting";

export type PropsInputOnChange = (key: string, newValue: string) => void;

export interface PropsInputCustomValidation {
  [key: string]: PropsInputCustomValidation | RegisterOptions | ((arg: any) => RegisterOptions);
}

export interface PropsInputValueValidations {
  minLength?: number;
  maxLength?: number;
  freeValue?: boolean;
}

export interface PropsInputValidation {
  custom?: PropsInputCustomValidation;
  writing?: PropsWritingValidations
  value?: PropsInputValueValidations
}

export interface PropsBaseInputConfig {
  register?: UseFormRegister<FieldValues>;
  validation?: PropsInputValidation;
  capitalize?: PropsWritingCapitalize;
};

export interface PropsBaseInput {
  name: string
  label: string
  initValue?: string
  inactive?: boolean
  required?: boolean
}
