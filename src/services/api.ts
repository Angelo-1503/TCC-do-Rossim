import axios from "axios";

const ESP32_IP = "http://SEU_IP_AQUI"; 
// Exemplo: "http://192.168.0.45"

export const api = axios.create({
  baseURL: ESP32_IP,
  timeout: 2000,
});
