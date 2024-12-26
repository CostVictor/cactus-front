import axios from "axios";

const cactusAPI = axios.create({
  baseURL: "http://192.168.3.102:8000/",
  withCredentials: true,
  timeout: 5 * 1000,
});

export default cactusAPI
