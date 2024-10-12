import { UseFormRegister, FieldValues } from "react-hook-form"

type PropsOnChange = (key: string, newValue: string) => void;

interface PropsCustomValidation {
  [key: string]: (value: string) => string | boolean;
}

export interface PropsInputOptions {
  icon?: string;
  selectOptions?: string[];
}

export interface PropsInputMessage {
  text: string
  isError?: boolean;
}

export interface PropsInputValidation {
  custom?: PropsCustomValidation;
  minLength?: number;
  maxLength?: number;
  notNumber?: boolean;
  notSymbol?: boolean;
  capitalize?: "first" | "all";
}

export interface PropsInputConfig {
  type?: "text" | "number" | "email" | "tel" | "password";
  register?: UseFormRegister<FieldValues>;
  validation?: PropsInputValidation;
}

export interface PropsInputField {
  name: string;
  label: string;
  value?: string;
  onChange?: PropsOnChange;
  equalTo?: string;
  message?: PropsInputMessage;
  options?: PropsInputOptions;
  config?: PropsInputConfig;
  required?: boolean;
}
