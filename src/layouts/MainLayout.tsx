import { useLocation } from "react-router-dom";
import { useState, cloneElement, isValidElement } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [offline, setOffline] = useState(false);

  // Títulos automáticos por rota
  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/sensores": "Sensores",
    "/historico": "Histórico",
    "/sistema": "Sistema",
    "/sobre": "Sobre",
  };

  const currentTitle = titles[location.pathname] ?? "Dashboard";

  const enhancedChildren =
    isValidElement(children)
      ? cloneElement(children, { setOffline })
      : children;

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar offline={offline} title={currentTitle} />

        <main className="p-6 overflow-y-auto">
          {enhancedChildren}
        </main>
      </div>
    </div>
  );
}
