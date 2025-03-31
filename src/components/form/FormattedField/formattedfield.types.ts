import { PropsBaseInput } from "../_shared/BaseInput"
import { writingFormatters } from "../_shared/utils"

export type PropsFormattedField = PropsBaseInput & {
  type: keyof typeof writingFormatters
  message?: string
  includeCleaner?: boolean
}
