import { useState, useEffect } from 'react';
import { cashService } from '../services/api';
import Card from '../components/Card';

export default function Cash() {
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ type: 'income', amount: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [summaryRes, historyRes] = await Promise.all([
        cashService.getSummary(),
        cashService.getHistory({ limit: 50 }),
      ]);
      setSummary(summaryRes.data);
      setHistory(historyRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount) return;

    try {
      await cashService.record({
        ...form,
        amount: parseFloat(form.amount),
      });
      setForm({ type: 'income', amount: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deletar movimento?')) {
      try {
        await cashService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">💰 Caixa</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <p className="text-gray-400 mb-2">Receita</p>
          <p className="text-3xl font-bold text-green-500">R$ {summary.income.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-gray-400 mb-2">Despesa</p>
          <p className="text-3xl font-bold text-red-500">R$ {summary.expenses.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-gray-400 mb-2">Saldo</p>
          <p className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            R$ {summary.balance.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Form */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Registrar Movimento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          >
            Registrar
          </button>
        </form>
      </Card>

      {/* History */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Histórico</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-700 p-3 rounded text-sm"
            >
              <div>
                <p className="font-semibold">{item.description || 'Sem descrição'}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-bold ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        {history.length === 0 && <p className="text-gray-400">Nenhum movimento</p>}
      </Card>
    </div>
  );
}
