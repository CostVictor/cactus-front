import { PropsOptions } from "@/components/form/OptionsField";

export interface PropsAddComposition {
  dayName: string;
  options: PropsOptions[] | string[];
  choiceNumber?: number;
}
