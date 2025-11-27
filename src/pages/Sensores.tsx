import { useFetchData } from "@/hooks/useFetchData";

export default function Sensores() {
  const { data, error } = useFetchData(1000);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sensores</h1>

      {error && (
        <div className="p-4 bg-yellow-600 text-black rounded-lg">
          ⚠ ESP32 Offline
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
        <div className="p-4 bg-card rounded-md border">
          <strong>MQ-7 (CO):</strong> {data?.mq7 ?? "--"} ADC
        </div>

        <div className="p-4 bg-card rounded-md border">
          <strong>AQI:</strong> {data?.aqi ?? "--"}
        </div>

        <div className="p-4 bg-card rounded-md border">
          <strong>TVOC:</strong> {data?.tvoc ?? "--"} ppb
        </div>

        <div className="p-4 bg-card rounded-md border">
          <strong>eCO₂:</strong> {data?.eco2 ?? "--"} ppm
        </div>
      </div>
    </div>
  );
}
