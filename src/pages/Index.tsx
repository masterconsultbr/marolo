import { motion } from "framer-motion";
import { Users, DollarSign, UserCheck, UserX } from "lucide-react";
import Header from "@/components/Layout/Header";
import BottomNav from "@/components/Layout/BottomNav";
import KPICard from "@/components/Dashboard/widgets/KPICard";
import PlayerCard from "@/components/Dashboard/widgets/PlayerCard";
import GamesCalendar from "@/components/Dashboard/widgets/GamesCalendar";
import FinancialWidget from "@/components/Dashboard/widgets/FinancialWidget";
import PaymentStatus from "@/components/Dashboard/widgets/PaymentStatus";
import QuickStatsTable from "@/components/Dashboard/widgets/QuickStatsTable";
import PresenceStatus from "@/components/Dashboard/widgets/PresenceStatus";
import QuickActions from "@/components/Dashboard/widgets/QuickActions";
import { mockPlayers, mockGames, mockPayments, mockBalance } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.5, bounce: 0.2 } },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative pb-20 md:pb-8">
      {/* Subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_hsl(196_90%_50%_/_0.06),_transparent_70%)]" />
      </div>

      <Header />

      <main className="relative z-10 px-4 md:px-6 py-6 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Marolo FC — Visão geral do time
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* KPIs Row */}
          <motion.div variants={item}>
            <KPICard icon={Users} value="15" label="Jogadores" sublabel="Total no elenco" />
          </motion.div>
          <motion.div variants={item}>
            <KPICard icon={DollarSign} value="R$ 2.340" label="Caixa" sublabel="Saldo atual" variant="default" />
          </motion.div>
          <motion.div variants={item}>
            <KPICard icon={UserCheck} value="12" label="Adimplentes" sublabel="Em dia" variant="success" />
          </motion.div>
          <motion.div variants={item}>
            <KPICard icon={UserX} value="3" label="Inadimplentes" sublabel="Pendentes" variant="destructive" />
          </motion.div>

          {/* Player Card + Games Calendar */}
          <motion.div variants={item} className="col-span-1 md:col-span-2 row-span-2">
            <PlayerCard player={mockPlayers[0]} />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-2 row-span-2">
            <GamesCalendar games={mockGames.filter(g => g.status === 'agendado')} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <QuickActions />
          </motion.div>

          {/* Presence */}
          <motion.div variants={item}>
            <PresenceStatus percentage={87} />
          </motion.div>

          {/* KPI extra */}
          <motion.div variants={item}>
            <KPICard icon={Users} value="8" label="Jogos" sublabel="Na temporada" />
          </motion.div>

          {/* Financial */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <FinancialWidget total={mockBalance.total} entradas={mockBalance.entradas} saidas={mockBalance.saidas} />
          </motion.div>

          {/* Stats Table */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <QuickStatsTable players={mockPlayers} />
          </motion.div>

          {/* Payment Status */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <PaymentStatus payments={mockPayments} />
          </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
