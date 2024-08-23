import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import cactusAPI from "@/services/axios/cactus-api";

interface propUseRequest {
  axionInstance?: AxiosInstance;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  config?: AxiosRequestConfig;
}

const useRequest = ({
  axionInstance = cactusAPI,
  url,
  method,
  config,
}: propUseRequest) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fethData = async () => {
      setLoading(true);
      try {
        const res = await axionInstance.request({ url, method, ...config });
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fethData();
  }, [axionInstance, url, method, config]);

  return { data, loading, error };
};

export default useRequest;
