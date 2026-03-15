import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Wallet, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import Header from "@/components/Layout/Header";
import BottomNav from "@/components/Layout/BottomNav";
import { mockMonthlyPayments, mockPlayers, type MonthlyPayment } from "@/types";
import { toast } from "sonner";

const statusConfig = {
  pago: { color: "text-success", bg: "bg-success/10", icon: CheckCircle2, label: "Pago" },
  pendente: { color: "text-warning", bg: "bg-warning/10", icon: AlertTriangle, label: "Pendente" },
  vencido: { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "Vencido" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.4, bounce: 0.15 } },
};

const monthLabels: Record<string, string> = {
  "2026-01": "Janeiro 2026",
  "2026-02": "Fevereiro 2026",
  "2026-03": "Março 2026",
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState<MonthlyPayment[]>(mockMonthlyPayments);
  const [expandedMonth, setExpandedMonth] = useState<string | null>("2026-03");
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2026-03");

  const months = [...new Set(payments.map((p) => p.month))].sort().reverse();

  const getMonthSummary = (month: string) => {
    const mp = payments.filter((p) => p.month === month);
    return {
      paid: mp.filter((p) => p.status === "pago").length,
      pending: mp.filter((p) => p.status === "pendente").length,
      overdue: mp.filter((p) => p.status === "vencido").length,
      total: mp.reduce((s, p) => s + (p.status === "pago" ? p.amount : 0), 0),
    };
  };

  const handleMarkPaid = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "pago" as const, paidAt: new Date().toISOString().slice(0, 10) } : p))
    );
    toast.success("Pagamento registrado!");
  };

  const handleRecordPayment = () => {
    if (!selectedPlayer) return;
    const existing = payments.find((p) => p.playerId === selectedPlayer && p.month === selectedMonth);
    if (existing) {
      handleMarkPaid(existing.id);
    } else {
      const player = mockPlayers.find((p) => p.id === selectedPlayer);
      if (!player) return;
      setPayments((prev) => [
        ...prev,
        {
          id: `${selectedPlayer}-${selectedMonth}-new`,
          playerId: selectedPlayer,
          playerName: player.name,
          month: selectedMonth,
          amount: 80,
          status: "pago" as const,
          paidAt: new Date().toISOString().slice(0, 10),
          dueDate: `${selectedMonth}-15`,
        },
      ]);
      toast.success("Pagamento registrado!");
    }
    setShowRecordModal(false);
    setSelectedPlayer("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />
      <main className="relative z-10 px-4 md:px-6 py-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Pagamentos</h1>
          <button
            onClick={() => setShowRecordModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} strokeWidth={1.5} />
            Registrar
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Mensalidades e histórico de pagamentos</p>

        {/* Month accordion */}
        <motion.div className="flex flex-col gap-4" variants={container} initial="hidden" animate="show">
          {months.map((month) => {
            const summary = getMonthSummary(month);
            const isExpanded = expandedMonth === month;
            const monthPayments = payments.filter((p) => p.month === month);

            return (
              <motion.div key={month} variants={item} className="glass-card !rounded-2xl">
                {/* Month header */}
                <button
                  onClick={() => setExpandedMonth(isExpanded ? null : month)}
                  className="w-full flex items-center justify-between"
                >
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm text-left">
                      {monthLabels[month] || month}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-success">{summary.paid} pagos</span>
                      {summary.pending > 0 && <span className="text-xs text-warning">{summary.pending} pendentes</span>}
                      {summary.overdue > 0 && <span className="text-xs text-destructive">{summary.overdue} vencidos</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="stat-number text-sm">R$ {summary.total}</span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded list */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-2">
                        {monthPayments.map((payment) => {
                          const sc = statusConfig[payment.status];
                          const StatusIcon = sc.icon;
                          return (
                            <div
                              key={payment.id}
                              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-muted/20 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <span className="text-[10px] font-display font-bold text-primary">
                                    {payment.playerName.split(" ").map((n) => n[0]).join("")}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{payment.playerName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {payment.paidAt ? `Pago em ${new Date(payment.paidAt + "T00:00:00").toLocaleDateString("pt-BR")}` : `Vence ${new Date(payment.dueDate + "T00:00:00").toLocaleDateString("pt-BR")}`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono font-medium text-foreground">R$ {payment.amount}</span>
                                {payment.status !== "pago" ? (
                                  <button
                                    onClick={() => handleMarkPaid(payment.id)}
                                    className="px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-colors"
                                  >
                                    Confirmar
                                  </button>
                                ) : (
                                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                                    <StatusIcon size={12} strokeWidth={1.5} />
                                    {sc.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Record payment modal */}
      <AnimatePresence>
        {showRecordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/60 backdrop-blur-sm"
            onClick={() => setShowRecordModal(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring" as const, duration: 0.4, bounce: 0.15 }}
              className="w-full max-w-md mx-4 mb-4 md:mb-0 glass-card !rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-foreground">Registrar Pagamento</h3>
                <button onClick={() => setShowRecordModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Jogador</label>
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="">Selecione...</option>
                    {mockPlayers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mês</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground text-sm focus:outline-none focus:border-primary/50"
                  >
                    {Object.entries(monthLabels).reverse().map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                  <span className="text-sm text-muted-foreground">Valor</span>
                  <span className="font-mono font-bold text-foreground">R$ 80,00</span>
                </div>
                <button
                  onClick={handleRecordPayment}
                  disabled={!selectedPlayer}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirmar Pagamento
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default PaymentsPage;
