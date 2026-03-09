import { useState, useEffect } from 'react';
import { paymentService, playerService } from '../services/api';
import Card from '../components/Card';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    player_id: '',
    amount: '',
    status: 'pending',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [form.month, form.year]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, playersRes] = await Promise.all([
        paymentService.getAll({
          month: form.month,
          year: form.year,
        }),
        playerService.getAll(),
      ]);
      setPayments(paymentsRes.data);
      setPlayers(playersRes.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.player_id || !form.amount) return;

    try {
      await paymentService.create(form);
      setForm({
        player_id: '',
        amount: '',
        status: 'pending',
        month: form.month,
        year: form.year,
      });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await paymentService.update(id, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deletar pagamento?')) {
      try {
        await paymentService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  const paidCount = payments.filter((p) => p.status === 'paid').length;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">💳 Mensalidades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <p className="text-gray-400 mb-2">Adimplentes ({form.month}/{form.year})</p>
          <p className="text-3xl font-bold text-green-500">{paidCount}</p>
        </Card>
        <Card>
          <p className="text-gray-400 mb-2">Inadimplentes ({form.month}/{form.year})</p>
          <p className="text-3xl font-bold text-red-500">{payments.length - paidCount}</p>
        </Card>
      </div>

      {/* Form */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Registrar Pagamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={form.player_id}
            onChange={(e) => setForm({ ...form, player_id: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Selecione um jogador</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="1"
              max="12"
              placeholder="Mês"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <input
              type="number"
              placeholder="Ano"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          >
            Registrar
          </button>
        </form>
      </Card>

      {/* List */}
      <Card>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded"
            >
              <div>
                <p className="font-bold">{payment.players.name}</p>
                <p className="text-sm text-gray-400">R$ {payment.amount.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={payment.status}
                  onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    payment.status === 'paid'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                </select>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-sm rounded transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        {payments.length === 0 && <p className="text-gray-400">Nenhum pagamento registrado</p>}
      </Card>
    </div>
  );
}
