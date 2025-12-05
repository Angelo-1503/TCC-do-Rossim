import axios from "axios";

const ESP32_IP = "192.168.1.32"; 
// Exemplo: "http://192.168.0.45"

export const api = axios.create({
  baseURL: ESP32_IP,
  timeout: 2000,
});
