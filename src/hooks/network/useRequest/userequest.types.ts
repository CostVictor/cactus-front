import { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from "axios";

export type PropsErrorResponse = { [key: string]: string[] } | undefined

export interface PropsCustomRequest {
  forceLoadingRequest?: boolean
  axiosInstance?: AxiosInstance
  standardDisplayError?: string | null
}

interface PropsRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: { [key: string]: string }
  config?: AxiosRequestConfig;
}

export interface PropsfetchDataFunction {
  request: PropsRequest
  onSuccess?: (res: AxiosResponse) => void
  onError?: (err: AxiosError) => void
  onFinally?: () => void
}
