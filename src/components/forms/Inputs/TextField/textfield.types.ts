import { PropsBaseInput, PropsBaseInputConfig } from "../input.types";
import { PropsConfigWriting } from "@/hooks/form/useWriting";

export type PropsTextFieldType = "text" | "numeric" | "email" | "password"

export interface PropsTextFieldConfig extends PropsBaseInputConfig {
  type?: PropsTextFieldType;
  writing?: Omit<PropsConfigWriting, "format">
}

export interface PropsTextField extends PropsBaseInput {
  config?: PropsTextFieldConfig
}
