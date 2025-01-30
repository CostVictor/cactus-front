type PropsCustomValidation = (value: string) => boolean | string;

export interface PropsGroupCustomValidation {
  [key: string]: PropsCustomValidation;
}

export interface PropsInputCustomValidation {
  [key: string]: (arg: any) => PropsGroupCustomValidation | PropsCustomValidation;
}
