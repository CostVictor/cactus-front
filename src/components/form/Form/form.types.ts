import { BaseData } from "@APISCMapping/data.types";
import { ReactNode, CSSProperties } from "react";

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];

export interface PropsForm {
  children: ReactNode;
  onSubmit: (data: BaseData) => void;
  outputData?: PropsFormatterData;
  className?: string;
  style?: CSSProperties;
}
