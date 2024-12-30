interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];
