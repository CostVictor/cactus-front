import { PropsBaseInput, PropsBaseInputConfig } from "../input.types";

export interface PropsInputMessage {
  text: string
  isError?: boolean;
}

export interface PropsTextFieldConfig extends PropsBaseInputConfig {
  type?: "text" | "numeric" | "email" | "password";
  icon?: string
}

export interface PropsTextField extends PropsBaseInput {
  message?: PropsInputMessage
  config?: PropsTextFieldConfig
}
