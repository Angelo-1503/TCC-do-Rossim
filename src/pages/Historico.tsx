import { useFetchData } from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import { GraphCard } from "@/components/GraphCard";

export default function Historico() {
  const { data } = useFetchData(1000);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setHistory((prev) => [
        ...prev.slice(-100),
        {
          time: new Date().toLocaleTimeString(),
          mq7: data.mq7,
        },
      ]);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Histórico</h1>

      <GraphCard data={history} />
    </div>
  );
}
