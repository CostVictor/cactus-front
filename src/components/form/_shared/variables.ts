export const notCapitalize = [
  "da", "das", "do", "dos", "de"
]

export const writingRules = {
  notNumber: /[0-9]/g,
  notSymbol: /[^A-Za-zÀ-ÿ0-9\s]/g
} as const satisfies { [key: string]: RegExp }
