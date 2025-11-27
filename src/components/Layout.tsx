import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout({ children, offline }: any) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex flex-col flex-1">
        <Topbar offline={offline} />

        <main className="p-6 bg-background text-foreground flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
