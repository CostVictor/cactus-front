interface PropsTimeFieldConfig {
  initValue?: string;
  validateFromNow?: boolean;
}

export interface PropsTimeField {
  name: string;
  label: string;
  type: "datetime-local" | "time";
  message?: string;
  config?: PropsTimeFieldConfig;
  required?: boolean;
}
