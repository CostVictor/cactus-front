export interface PropsDataFormatter {
  [key: string]: string | PropsDataFormatter
}

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];
