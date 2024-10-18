import axios from "axios";

const cactusAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default cactusAPI
