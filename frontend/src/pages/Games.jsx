// Games.jsx
import { useState, useEffect } from 'react';
import { gameService } from '../services/api';
import Card from '../components/Card';

export default function Games() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({ date: '', opponent: '', notes: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await gameService.getAll();
      setGames(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.opponent) return;

    try {
      await gameService.create(form);
      setForm({ date: '', opponent: '', notes: '' });
      fetchGames();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deletar jogo?')) {
      try {
        await gameService.delete(id);
        fetchGames();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">🎮 Jogos</h1>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Agendar Jogo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <input
            type="text"
            placeholder="Adversário"
            value={form.opponent}
            onChange={(e) => setForm({ ...form, opponent: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
          />
          <textarea
            placeholder="Observações (opcional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
            rows="3"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          >
            Agendar
          </button>
        </form>
      </Card>

      <div className="space-y-4">
        {games.map((game) => (
          <Card key={game.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-bold">
                  vs {game.opponent}
                </p>
                <p className="text-gray-400">
                  {new Date(game.date).toLocaleDateString('pt-BR')}
                </p>
                {game.notes && <p className="text-sm mt-2">{game.notes}</p>}
              </div>
              <button
                onClick={() => handleDelete(game.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
              >
                Deletar
              </button>
            </div>
          </Card>
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nenhum jogo agendado
        </div>
      )}
    </div>
  );
}
