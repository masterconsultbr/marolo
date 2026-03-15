import { Zap, Bell } from "lucide-react";
import DesktopNav from "./DesktopNav";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-6 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap size={24} strokeWidth={1.5} className="text-primary" />
            <span className="text-lg font-display font-bold text-foreground tracking-tight">Marolo</span>
          </div>
          <DesktopNav />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <Bell size={20} strokeWidth={1.5} className="text-muted-foreground" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/20 ring-2 ring-primary/30 flex items-center justify-center">
            <span className="text-xs font-display font-bold text-primary">M</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
