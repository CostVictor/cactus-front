import { http } from "./endpoints";
import axios from "axios";

const cactusAPI = axios.create({
  baseURL: http.baseUrl,
  withCredentials: true,
  timeout: 5 * 1000,
});

export default cactusAPI;
