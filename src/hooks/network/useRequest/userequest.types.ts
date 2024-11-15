import { AxiosRequestConfig } from "axios";

export interface PropsCustomRequest {
  forceUpdate?: boolean
  initLoading?: boolean
  titleError?: string
}

export type PropsErrorResponse = { [key: string]: string[] } | undefined

export interface PropsFethDataFunction {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  content?: { [key: string]: string }
  config?: AxiosRequestConfig;
}
