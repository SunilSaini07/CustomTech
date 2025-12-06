import axios from "axios";

const axioss = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default axioss;