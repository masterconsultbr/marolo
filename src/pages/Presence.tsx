import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ClipboardCheck } from "lucide-react";
import Header from "@/components/Layout/Header";
import BottomNav from "@/components/Layout/BottomNav";
import { mockPresenceRecords, mockPlayers } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.4, bounce: 0.15 } },
};

const PresencePage = () => {
  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  // Per-player summary
  const playerSummary = mockPlayers.map((p) => {
    const total = mockPresenceRecords.length;
    const present = mockPresenceRecords.filter((r) => r.players.find((pp) => pp.playerId === p.id)?.present).length;
    return { ...p, total, present, rate: Math.round((present / total) * 100) };
  }).sort((a, b) => b.rate - a.rate);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />
      <main className="relative z-10 px-4 md:px-6 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">Presença</h1>
        <p className="text-sm text-muted-foreground mb-8">Controle de frequência nos jogos</p>

        {/* Player Summary */}
        <section className="mb-10">
          <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck size={18} strokeWidth={1.5} className="text-primary" />
            Resumo por Jogador
          </h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={container} initial="hidden" animate="show">
            {playerSummary.map((p) => (
              <motion.div key={p.id} variants={item} className="glass-card !p-4 !rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-display font-bold text-primary">{p.number}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.present}/{p.total} jogos</p>
                  </div>
                </div>
                <span className={`text-lg font-display font-bold tabular-nums ${
                  p.rate >= 80 ? "text-success" : p.rate >= 50 ? "text-warning" : "text-destructive"
                }`}>
                  {p.rate}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Per-game history */}
        <section>
          <h2 className="text-base font-display font-semibold text-foreground mb-4">Histórico por Jogo</h2>
          <motion.div className="flex flex-col gap-4" variants={container} initial="hidden" animate="show">
            {mockPresenceRecords.map((record) => {
              const presentCount = record.players.filter((p) => p.present).length;
              return (
                <motion.div key={record.id} variants={item} className="glass-card !rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">{record.gameLabel}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(record.date)}</p>
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {presentCount}/{record.players.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {record.players.map((p) => (
                      <div key={p.playerId} className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-xl ${
                        p.present ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>
                        {p.present ? <CheckCircle2 size={12} strokeWidth={1.5} /> : <XCircle size={12} strokeWidth={1.5} />}
                        {p.playerName.split(" ")[0]}
                      </div>
                    ))}
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

export default PresencePage;
