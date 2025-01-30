import { formatPrice, formatTel } from "./utils"

export const notCapitalize = [
  "da", "das", "do", "dos", "de"
]

export const writingRules: { [key: string]: RegExp } = {
  notNumber: /[0-9]/g,
  notSymbol: /[^A-Za-zÀ-ÿ0-9\s]/g
}

export const writingFormatters = {
  price: formatPrice,
  tel: formatTel
} as const
