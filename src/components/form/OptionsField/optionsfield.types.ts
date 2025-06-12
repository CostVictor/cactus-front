export interface PropsOptions {
  name: string;
  value?: any;
}

interface PropsConfigOptionsField {
  initChecked?: any
  messageWhenNotOptions?: string
}

export interface PropsOptionsField {
  name: string;
  label: string;
  type: "radio" | "checkbox";
  options: PropsOptions[] | string[];
  config?: PropsConfigOptionsField
  required?: boolean;
}
