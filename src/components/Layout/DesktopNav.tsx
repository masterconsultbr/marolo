import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Trophy, ClipboardCheck, Wallet } from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/jogos", icon: Trophy, label: "Jogos" },
  { path: "/presenca", icon: ClipboardCheck, label: "Presença" },
  { path: "/pagamentos", icon: Wallet, label: "Pagamentos" },
];

const DesktopNav = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
