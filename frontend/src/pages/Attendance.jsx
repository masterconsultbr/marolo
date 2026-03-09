import { useState, useEffect } from 'react';
import { gameService, attendanceService, playerService } from '../services/api';
import Card from '../components/Card';

export default function Attendance() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [gameAttendance, setGameAttendance] = useState([]);
  const [form, setForm] = useState({ player_id: '', goals: 0, assists: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      fetchGameAttendance(selectedGame);
    }
  }, [selectedGame]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gamesRes, playersRes] = await Promise.all([
        gameService.getAll(),
        playerService.getAll(),
      ]);
      setGames(gamesRes.data);
      setPlayers(playersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchGameAttendance = async (gameId) => {
    try {
      const res = await attendanceService.getByGame(gameId);
      setGameAttendance(res.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setGameAttendance([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGame || !form.player_id) {
      setMessage('Selecione um jogo e um jogador');
      return;
    }

    try {
      await attendanceService.record({
        player_id: parseInt(form.player_id),
        game_id: parseInt(selectedGame),
        goals: parseInt(form.goals) || 0,
        assists: parseInt(form.assists) || 0,
      });

      setMessage('✅ Presença registrada com sucesso!');
      setForm({ player_id: '', goals: 0, assists: 0 });
      fetchGameAttendance(selectedGame);

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error recording attendance:', error);
      setMessage('❌ Erro ao registrar presença');
    }
  };

  const handleUpdate = async (id, goals, assists) => {
    try {
      await attendanceService.update(id, { goals, assists });
      setMessage('✅ Atualizado com sucesso!');
      fetchGameAttendance(selectedGame);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating attendance:', error);
      setMessage('❌ Erro ao atualizar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deletar presença?')) {
      try {
        await attendanceService.delete(id);
        setMessage('✅ Deletado com sucesso!');
        fetchGameAttendance(selectedGame);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting attendance:', error);
        setMessage('❌ Erro ao deletar');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">📊 Registrar Presença & Gols</h1>

      {message && (
        <div className="mb-4 p-4 bg-blue-600 text-white rounded">
          {message}
        </div>
      )}

      {/* Seleção de Jogo */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Selecione um Jogo</h2>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        >
          <option value="">Selecione um jogo...</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.opponent} - {new Date(game.date).toLocaleDateString('pt-BR')}
            </option>
          ))}
        </select>
        {games.length === 0 && (
          <p className="text-gray-400 mt-2">
            Nenhum jogo criado. Vá em "Jogos" para agendar um jogo primeiro.
          </p>
        )}
      </Card>

      {selectedGame && (
        <>
          {/* Formulário para registrar presença */}
          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Registrar Presença</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={form.player_id}
                onChange={(e) => setForm({ ...form, player_id: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Selecione um jogador</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Gols</label>
                  <input
                    type="number"
                    min="0"
                    value={form.goals}
                    onChange={(e) =>
                      setForm({ ...form, goals: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Assistências</label>
                  <input
                    type="number"
                    min="0"
                    value={form.assists}
                    onChange={(e) =>
                      setForm({ ...form, assists: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
              >
                Registrar Presença
              </button>
            </form>
          </Card>

          {/* Lista de Presenças no Jogo */}
          <Card>
            <h2 className="text-2xl font-bold mb-4">Presença no Jogo</h2>
            {gameAttendance.length > 0 ? (
              <div className="space-y-4">
                {gameAttendance.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="bg-gray-700 p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-lg">
                        {attendance.players.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        ⚽ {attendance.goals} gols | 🎯 {attendance.assists} assists
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const newGoals = prompt('Novos gols:', attendance.goals);
                          if (newGoals !== null) {
                            const newAssists = prompt(
                              'Novas assistências:',
                              attendance.assists
                            );
                            if (newAssists !== null) {
                              handleUpdate(
                                attendance.id,
                                parseInt(newGoals),
                                parseInt(newAssists)
                              );
                            }
                          }
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(attendance.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                Nenhuma presença registrada para este jogo
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}