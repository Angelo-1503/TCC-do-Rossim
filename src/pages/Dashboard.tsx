import { SensorCard } from "@/components/SensorCard";
import { GraphCard } from "@/components/GraphCard";
import { useFetchData } from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

export default function Dashboard({ setOffline }: { setOffline: (v: boolean) => void }) {
  const { data, error } = useFetchData(1000);

  // sempre atualiza o offline no MainLayout
  useEffect(() => {
    setOffline(!!error);
  }, [error, setOffline]);

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setHistory((prev) => [
        ...prev.slice(-30),
        {
          time: new Date().toLocaleTimeString(),
          mq7: data.mq7,
        },
      ]);
    }
  }, [data]);

  return (
    <div className="space-y-6">

      {error && (
        <div className="p-4 bg-yellow-600 text-black rounded-lg">
          ⚠ ESP32 não detectado — exibindo dados offline
        </div>
      )}

      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Cards dos sensores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SensorCard title="MQ-7" value={data?.mq7 ?? "--"} unit="ADC" />
        <SensorCard title="AQI" value={data?.aqi ?? "--"} />
        <SensorCard title="TVOC" value={data?.tvoc ?? "--"} unit="ppb" />
        <SensorCard title="eCO₂" value={data?.eco2 ?? "--"} unit="ppm" />
      </div>

      {/* Gráfico histórico */}
      <GraphCard data={history} />
    </div>
  );
}
