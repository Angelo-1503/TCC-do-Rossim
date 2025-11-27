import { NavLink } from "react-router-dom";
import { Home, Gauge, BarChart3, Server, Info } from "lucide-react";

const menu = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Sensores", path: "/sensores", icon: Gauge },
  { label: "Histórico", path: "/historico", icon: BarChart3 },
  { label: "Sistema", path: "/sistema", icon: Server },
  { label: "Sobre", path: "/sobre", icon: Info },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-2">
      {menu.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition
              ${isActive ? "bg-zinc-700 text-white" : "text-zinc-300 hover:bg-zinc-800"}`
            }
          >
            <Icon className="w-5 h-5" /> {item.label}
          </NavLink>
        );
      })}
    </div>
  );
}
