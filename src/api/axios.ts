// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://66b742e67f7b1c6d8f1b6054.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
