import { baseUrlHttp } from "./mapping/endpoints";
import axios from "axios";

const cactusAPI = axios.create({
  baseURL: baseUrlHttp,
  withCredentials: true,
  timeout: 5 * 1000,
});

export default cactusAPI;
