import { formatPrice, formatTel } from "./usewriting.utils"
import { PropsListValidations } from "./usewriting.types"

export const notCapitalize = [
  "da", "das", "do", "dos", "de"
]

export const listValidations: PropsListValidations = {
  notNumber: /[0-9]/g,
  notSymbol: /[^A-Za-zÀ-ÿ0-9\s]/g
}

export const listFormatters = {
  price: formatPrice,
  tel: formatTel
} as const
