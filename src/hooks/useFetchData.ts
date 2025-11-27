import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { SensorData } from "../types/SensorData";

export function useFetchData(interval: number = 1000) {
  const [data, setData] = useState<SensorData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchNow = () => {
      api.get<SensorData>("/dados")
        .then((res) => {
          setData(res.data);
          setError(false);
        })
        .catch(() => {
          setError(true);
        });
    };

    fetchNow();
    const timer = setInterval(fetchNow, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { data, error };
}
