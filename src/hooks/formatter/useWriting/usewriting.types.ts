import { listFormatters, listValidations } from "./usewriting.variables"

export type PropsWritingCapitalize = "first" | "all"

export type PropsWritingValidations = {
  [K in keyof typeof listValidations]?: boolean;
};

export interface PropsUseWriting {
  initValue?: string
  capitalize?: PropsWritingCapitalize
  format?: keyof typeof listFormatters
  validations?: PropsWritingValidations
}

export interface PropsListValidations {
  [key: string]: RegExp
}
