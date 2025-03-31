import { PropsGroupCustomValidation } from "../types";

export interface PropsBaseTextareaConfig {
  initValue?: string;
  valueRules?: PropsGroupCustomValidation;
  isMessageMode?: boolean;
  expandTo?: string | number;
}

export interface PropsBaseTextarea {
  name: string
  label: string
  required?: boolean
  inactive?: boolean
  config?: PropsBaseTextareaConfig
}
