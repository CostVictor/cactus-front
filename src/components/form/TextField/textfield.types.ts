import { Control, FieldValues } from "react-hook-form";

export interface PropsTextField {
  name: string;
  label: string;
  control: Control<FieldValues>;
  config?: {}
}
