import axios from "axios";

const httpML = axios.create({
  baseURL: import.meta.env.VITE_API_ML_BASE_URL,
  timeout: 120000,
});

export default httpML;
