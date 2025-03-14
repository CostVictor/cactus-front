import { apiHTTP } from "./endpoints";
import axios from "axios";

const cactusAPI = axios.create({
  baseURL: apiHTTP.baseUrl,
  withCredentials: true,
  timeout: 5 * 1000,
});

export default cactusAPI;
