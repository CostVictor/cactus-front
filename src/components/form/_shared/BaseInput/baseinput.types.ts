import { ReactNode } from 'react';

import { PropsGroupCustomValidation } from '../types';
import { writingFormatters } from '../utils';
import { writingRules } from '../variables';

export type PropsBaseInputTypes = "text" | "password" | "demanding-password" | "email" | "number" | "tel" | "datetime-local" | "search" | "image" | "price";

export type PropsWritingCapitalize = "first" | "all"

export type PropsWritingRules = {
  [K in keyof typeof writingRules]?: boolean;
};

export interface PropsBaseInputConfigValueRules {
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
  valueRules?: PropsBaseInputConfigValueRules;
  writing?: PropsBaseInputConfigWriting;
  isMessageMode?: boolean;
  icon?: string;
}

export interface PropsBaseInput {
  name: string;
  label: string;
  type: PropsBaseInputTypes;
  className?: string;
  onChange?: () => void;
  required?: boolean;
  inactive?: boolean;
  config?: PropsBaseInputConfig;
  children?: ReactNode
}
