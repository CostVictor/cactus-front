import { UseFormRegister, FieldValues } from "react-hook-form"

type PropsOnChange = (key: string, newValue: string) => void;

interface PropsCustomValidation {
  [key: string]: (value: string) => string | boolean;
}

interface PropsInputOptions {
  icon?: string;
  selectOptions?: string[];
}

interface PropsInputConfig {
  type?: "text" | "number" | "email" | "tel" | "password";
  register?: UseFormRegister<FieldValues>;
  validation?: PropsInputValidation;
}

export interface PropsInputValidation {
  custom?: PropsCustomValidation;
  minLength?: number;
  maxLength?: number;
  notText?: boolean;
  notNumber?: boolean;
  notSymbol?: boolean;
}

export interface PropsInputField {
  name: string;
  label: string;
  value?: string;
  onChange?: PropsOnChange;
  errorMessage?: string;
  options?: PropsInputOptions;
  config?: PropsInputConfig;
  required?: boolean;
}
