export interface PropsOptionsField {
  name: string;
  label: string;
  type: "radio" | "checkbox";
  options: string[];
  message?: string;
  required?: boolean;
}
