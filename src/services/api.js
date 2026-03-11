import axios from "axios";

const API = axios.create({
  baseURL: "https://anvaya-b.vercel.app/",
});

export default API;