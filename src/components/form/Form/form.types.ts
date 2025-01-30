import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import { BaseData } from "@APISCMapping/data.types";
import { ReactNode } from "react";

interface PropsFormatterList {
  name: string, format: PropsFormatterData
}

export type PropsFormatterData = (string | PropsFormatterList)[];

export interface PropsForm {
  children: ReactNode;
  onSubmit: (data: BaseData) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  outputData?: PropsFormatterData;
}
