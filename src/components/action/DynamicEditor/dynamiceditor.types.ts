import InputField from "@/components/forms/InputField";
import { BaseData } from "@APISCMapping/data.types";

export interface DynamicEditorProps {
  children: React.ReactElement<typeof InputField> | React.ReactElement<typeof InputField>[];
  data: BaseData;
  title: string;
  img: string;
}
