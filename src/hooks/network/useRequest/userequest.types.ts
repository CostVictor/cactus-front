import { AxiosRequestConfig } from "axios";

export type PropsErrorResponse = { [key: string]: string[] } | undefined

export interface PropsFethDataFunction {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  content?: { [key: string]: string }
  config?: AxiosRequestConfig;
}
