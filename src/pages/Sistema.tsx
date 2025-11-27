import { Wifi, WifiOff, Server, Cpu } from "lucide-react";
import { useFetchData } from "@/hooks/useFetchData";

export default function Sistema() {
  const { data, error } = useFetchData(2000);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 bg-card rounded-md border flex items-center gap-3">
          {error ? (
            <WifiOff className="w-6 h-6 text-red-500" />
          ) : (
            <Wifi className="w-6 h-6 text-green-500" />
          )}
          <div>
            <strong>Status:</strong> {error ? "Offline" : "Online"}
          </div>
        </div>

        <div className="p-4 bg-card rounded-md border flex items-center gap-3">
          <Server className="w-6 h-6" />
          <div>
            <strong>IP do ESP:</strong> {data?.ip ?? "--"}
          </div>
        </div>

        <div className="p-4 bg-card rounded-md border flex items-center gap-3">
          <Cpu className="w-6 h-6" />
          <div>
            <strong>RSSI Wi-Fi:</strong> {data?.rssi ?? "--"} dBm
          </div>
        </div>

      </div>
    </div>
  );
}
