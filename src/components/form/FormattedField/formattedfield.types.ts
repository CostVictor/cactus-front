import { PropsBaseInput } from "../_shared/BaseInput"
import { writingFormatters } from "../_shared/variables"

export type PropsFormattedField = PropsBaseInput & {
  type: keyof typeof writingFormatters
  message?: string
}
