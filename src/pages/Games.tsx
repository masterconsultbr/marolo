import { motion } from "framer-motion";
import { Trophy, MapPin, Clock, CheckCircle2, XCircle, Minus } from "lucide-react";
import Header from "@/components/Layout/Header";
import BottomNav from "@/components/Layout/BottomNav";
import { mockGames } from "@/types";

const resultConfig = {
  vitória: { color: "text-success", bg: "bg-success/10", icon: CheckCircle2, label: "Vitória" },
  derrota: { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "Derrota" },
  empate: { color: "text-warning", bg: "bg-warning/10", icon: Minus, label: "Empate" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.4, bounce: 0.15 } },
};

const GamesPage = () => {
  const upcoming = mockGames.filter((g) => g.status === "agendado");
  const finished = mockGames.filter((g) => g.status === "finalizado");

  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />
      <main className="relative z-10 px-4 md:px-6 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">Jogos</h1>
        <p className="text-sm text-muted-foreground mb-8">Histórico e próximos jogos do time</p>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy size={18} strokeWidth={1.5} className="text-primary" />
              Próximos Jogos
            </h2>
            <motion.div className="flex flex-col gap-3" variants={container} initial="hidden" animate="show">
              {upcoming.map((game) => (
                <motion.div key={game.id} variants={item} className="glass-card flex items-center gap-4 !p-4 !rounded-2xl">
                  <div className="flex flex-col items-center min-w-[52px]">
                    <span className="text-xs text-muted-foreground uppercase">{formatDate(game.date).split(" ")[1]}</span>
                    <span className="text-xl font-display font-bold text-primary">{formatDate(game.date).split(" ")[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">vs {game.opponent}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} strokeWidth={1.5} /> {game.time}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} strokeWidth={1.5} /> {game.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Agendado</span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* History */}
        <section>
          <h2 className="text-base font-display font-semibold text-foreground mb-4">Histórico</h2>
          <motion.div className="flex flex-col gap-3" variants={container} initial="hidden" animate="show">
            {finished.map((game) => {
              const rc = resultConfig[game.result as keyof typeof resultConfig];
              const ResultIcon = rc?.icon || Minus;
              return (
                <motion.div key={game.id} variants={item} className="glass-card flex items-center gap-4 !p-4 !rounded-2xl">
                  <div className="flex flex-col items-center min-w-[52px]">
                    <span className="text-xs text-muted-foreground">{formatDate(game.date)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">vs {game.opponent}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{game.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono font-bold text-foreground text-sm">{game.score}</span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${rc?.bg} ${rc?.color}`}>
                      <ResultIcon size={12} strokeWidth={1.5} />
                      {rc?.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default GamesPage;
