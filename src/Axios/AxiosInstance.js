import { BASEURL } from "./BaseUrl";
import axios from "axios";
const token = localStorage.getItem("access");

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": token
  },
});

