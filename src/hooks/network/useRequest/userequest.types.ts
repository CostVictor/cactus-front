import { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from "axios";

export type PropsErrorResponse = { [key: string]: string[] } | undefined

export interface PropsConfigRequest {
  forceLoadingRequest?: boolean
  defaultErrorTitle?: string
  showErrorModal?: boolean
  axiosInstance?: AxiosInstance
}

interface PropsRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: { [key: string]: string | string[] }
  config?: AxiosRequestConfig;
}

export interface PropsFetchDataFunction {
  request: PropsRequest
  modalTitleWhenError?: string
  onSuccess?: (res: AxiosResponse) => void
  onError?: (err: AxiosError) => void
  onFinally?: () => void
}

export interface PropsUseRequest {
  initFetchData?: PropsFetchDataFunction
  config?: PropsConfigRequest
}
