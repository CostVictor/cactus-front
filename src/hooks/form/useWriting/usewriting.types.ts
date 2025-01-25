import { listFormatters, listValidations } from "./usewriting.variables"
import { PropsInputOnChange } from "@/components/forms/Inputs";

export type PropsWritingCapitalize = "first" | "all"

export type PropsWritingRules = {
  [K in keyof typeof listValidations]?: boolean;
};

export interface PropsConfigWriting {
  format?: keyof typeof listFormatters
  capitalize?: PropsWritingCapitalize
  rules?: PropsWritingRules
}

export interface PropsUseWriting {
  initValue?: string
  onChange?: PropsInputOnChange
  config?: PropsConfigWriting
}

export interface PropsListValidations {
  [key: string]: RegExp
}
