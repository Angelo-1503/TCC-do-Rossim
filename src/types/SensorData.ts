export interface SensorData {
  mq7: number;
  aqi: number;
  tvoc: number;
  eco2: number;
  status: "seguro" | "alerta";
  timestamp: number;
}
