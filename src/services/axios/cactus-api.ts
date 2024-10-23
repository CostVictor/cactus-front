import axios from "axios";

const cactusAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
  timeout: 5 * 1000,
});

export default cactusAPI
