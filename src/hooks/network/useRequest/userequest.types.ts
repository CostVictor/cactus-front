import { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from "axios";

export type PropsErrorResponse = { [key: string]: string[] } | undefined

export interface PropsCustomRequest {
  forceLoadingRequest?: boolean
  axiosInstance?: AxiosInstance
  showError?: {
    title: string
  }
}

interface PropsRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  content?: { [key: string]: string }
  config?: AxiosRequestConfig;
}

export interface PropsFethDataFunction {
  request: PropsRequest
  onSuccess?: (res: AxiosResponse) => void
  onError?: (err: AxiosError) => void
  onFinally?: () => void
}
