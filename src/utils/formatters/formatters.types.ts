export interface PropsData {
  [key: string]: string | PropsData
}

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];
