import { FieldValues } from "react-hook-form";
import { ReactNode, CSSProperties, LegacyRef } from "react";

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];

export interface PropsForm {
  children: ReactNode;
  onSubmit: (data: FieldValues) => void;
  outputData?: PropsFormatterData;
  className?: string;
  style?: CSSProperties;
  id?: string
}
