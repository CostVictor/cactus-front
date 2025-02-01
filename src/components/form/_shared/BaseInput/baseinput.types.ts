import { Control, FieldValues } from 'react-hook-form';

import { PropsGroupCustomValidation } from '../types';
import { writingFormatters, writingRules } from '../variables';

export type PropsBaseInputTypes = "text" | "password" | "email" | "number" | "tel" | "datetime-local" | "search" | "image" | "price";

export type PropsWritingCapitalize = "first" | "all"

export type PropsWritingRules = {
  [K in keyof typeof writingRules]?: boolean;
};

export interface PropsBaseInputConfigRules {
  custom?: PropsGroupCustomValidation;
  minLength?: number;
  maxLength?: number;
}

export interface PropsBaseInputConfigWriting {
  setFormat?: keyof typeof writingFormatters
  capitalize?: PropsWritingCapitalize
  rules?: PropsWritingRules
}

export interface PropsBaseInputConfig {
  initValue?: string;
  icon?: string;
  rules?: PropsBaseInputConfigRules;
  writing?: PropsBaseInputConfigWriting;
  isMessageMode?: boolean;
}

export interface PropsBaseInput {
  name: string;
  label: string;
  type: PropsBaseInputTypes;
  control: Control<FieldValues>;
  className?: string;
  onChange?: () => void;
  notIncluded?: boolean;
  required?: boolean;
  inactive?: boolean;
  config?: PropsBaseInputConfig;
}
