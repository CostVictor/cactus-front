import axios from "axios";

const cactusAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default cactusAPI
