import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:8080",
});

export const requestAdress = axios.create({
  baseURL: "http://localhost:8080",
});
