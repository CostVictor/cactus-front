import { AxiosRequestConfig } from "axios";

export interface PropsFethDataFunction {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  content?: { [key: string]: string }
  config?: AxiosRequestConfig;
}
