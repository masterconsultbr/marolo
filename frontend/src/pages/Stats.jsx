import { useState, useEffect } from 'react';
import { statsService } from '../services/api';
import Card from '../components/Card';

export default function Stats() {
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [scorersRes, assistsRes, statsRes] = await Promise.all([
        statsService.getTopScorers({ limit: 10 }),
        statsService.getTopAssists({ limit: 10 }),
        statsService.getPlayerStats(),
      ]);
      setTopScorers(scorersRes.data);
      setTopAssists(assistsRes.data);
      setAllStats(statsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">📊 Estatísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Scorers */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">⚽ Artilheiros</h2>
          <div className="space-y-3">
            {topScorers.map((scorer, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                <div>
                  <p className="font-semibold">#{idx + 1} {scorer.name}</p>
                </div>
                <p className="text-lg font-bold text-yellow-500">{scorer.goals}</p>
              </div>
            ))}
          </div>
          {topScorers.length === 0 && <p className="text-gray-400">Nenhum dado</p>}
        </Card>

        {/* Top Assists */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">🎯 Assistências</h2>
          <div className="space-y-3">
            {topAssists.map((assist, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                <div>
                  <p className="font-semibold">#{idx + 1} {assist.name}</p>
                </div>
                <p className="text-lg font-bold text-blue-500">{assist.assists}</p>
              </div>
            ))}
          </div>
          {topAssists.length === 0 && <p className="text-gray-400">Nenhum dado</p>}
        </Card>
      </div>

      {/* Complete Stats */}
      <Card className="mt-8">
        <h2 className="text-2xl font-bold mb-4">📈 Estatísticas Completas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-2">Jogador</th>
                <th className="text-center p-2">Jogos</th>
                <th className="text-center p-2">Gols</th>
                <th className="text-center p-2">Assists</th>
              </tr>
            </thead>
            <tbody>
              {allStats.map((stat) => (
                <tr key={stat.player_id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2 font-semibold">{stat.name}</td>
                  <td className="text-center p-2">{stat.games}</td>
                  <td className="text-center p-2 text-yellow-500 font-bold">{stat.goals}</td>
                  <td className="text-center p-2 text-blue-500 font-bold">{stat.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {allStats.length === 0 && <p className="text-gray-400 p-4">Nenhum dado</p>}
        </div>
      </Card>
    </div>
  );
}
