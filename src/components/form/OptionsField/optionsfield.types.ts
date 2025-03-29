export interface PropsOptions {
  name: string;
  value?: string;
}

interface PropsConfigOptionsField {
  initChecked?: string | string[]
}

export interface PropsOptionsField {
  name: string;
  label: string;
  type: "radio" | "checkbox";
  options: PropsOptions[] | string[];
  config?: PropsConfigOptionsField
  required?: boolean;
}
