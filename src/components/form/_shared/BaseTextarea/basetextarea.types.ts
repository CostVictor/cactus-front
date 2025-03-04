import { PropsGroupCustomValidation } from "../types";

export interface PropsBaseTextareaConfig {
  initValue?: string;
  valueRules?: PropsGroupCustomValidation;
  isMessageMode?: boolean;
}

export interface PropsBaseTextarea {
  name: string
  label: string
  required?: boolean
  inactive?: boolean
  config?: PropsBaseTextareaConfig
}
