import { Wifi, WifiOff } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ offline, title }: { offline: boolean; title: string }) {
  return (
    <div className="h-16 bg-muted border-b border-border px-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {offline ? (
          <div className="flex items-center gap-2 text-yellow-600">
            <WifiOff className="w-5 h-5" /> ESP Offline
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-500">
            <Wifi className="w-5 h-5" /> Conectado
          </div>
        )}
      </div>
    </div>
  );
}
