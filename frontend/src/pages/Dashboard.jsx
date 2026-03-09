import { useState, useEffect } from 'react';
import { cashService, paymentService, statsService } from '../services/api';
import Card from '../components/Card';

export default function Dashboard() {
  const [cash, setCash] = useState(0);
  const [payments, setPayments] = useState({ paid: 0, pending: 0 });
  const [topScorers, setTopScorers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cashRes, payRes, scorersRes] = await Promise.all([
          cashService.getBalance(),
          paymentService.getSummary(),
          statsService.getTopScorers({ limit: 5 }),
        ]);

        setCash(cashRes.data.balance);
        setPayments(payRes.data);
        setTopScorers(scorersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-gray-400 mb-2">Caixa Total</p>
            <p className={`text-4xl font-bold ${cash >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              R$ {cash.toFixed(2)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-400 mb-2">Adimplentes</p>
            <p className="text-4xl font-bold text-green-500">{payments.paid}</p>
            <p className="text-sm text-gray-500 mt-1">mês atual</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-400 mb-2">Inadimplentes</p>
            <p className="text-4xl font-bold text-red-500">{payments.pending}</p>
            <p className="text-sm text-gray-500 mt-1">mês atual</p>
          </div>
        </Card>
      </div>

      {/* Top Scorers */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">🔥 Artilheiros</h2>
        <div className="space-y-3">
          {topScorers.length > 0 ? (
            topScorers.map((scorer, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                <div>
                  <p className="font-semibold">{idx + 1}. {scorer.name}</p>
                </div>
                <p className="text-xl font-bold text-green-500">{scorer.goals} ⚽</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Nenhum gol registrado ainda</p>
          )}
        </div>
      </Card>
    </div>
  );
}
