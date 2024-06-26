import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
});

export default instance;