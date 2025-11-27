import { useEffect, useState } from "react";

export function useEspStatus() {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("http://192.168.1.100/api/status", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) throw new Error();

        setOnline(true);
      } catch {
        setOnline(false);
      }
    };

    check();
    const interval = setInterval(check, 2000);

    return () => clearInterval(interval);
  }, []);

  return { online };
}
