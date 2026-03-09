import { useState, useEffect } from 'react';
import { playerService } from '../services/api';
import Card from '../components/Card';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: '', position: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await playerService.getAll();
      setPlayers(res.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await playerService.update(editingId, form);
        setEditingId(null);
      } else {
        await playerService.create(form);
      }
      setForm({ name: '', position: '' });
      fetchPlayers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await playerService.delete(id);
        fetchPlayers();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (player) => {
    setEditingId(player.id);
    setForm({ name: player.name, position: player.position || '' });
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">👥 Jogadores</h1>

      {/* Form */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? 'Editar' : 'Adicionar'} Jogador
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Posição (ex: Atacante)"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: '', position: '' });
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <Card key={player.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-bold">{player.name}</p>
                <p className="text-gray-400 text-sm">{player.position || 'Sem posição'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(player)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                >
                  Deletar
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nenhum jogador adicionado ainda
        </div>
      )}
    </div>
  );
}
