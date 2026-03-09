import { supabase } from '../db/supabase.js';

export const getTopScorers = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const { data, error } = await supabase
      .from('attendance')
      .select('player_id, goals, players(id, name)')
      .order('goals', { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    // Group by player and sum goals
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.player_id]) {
        grouped[item.player_id] = {
          player_id: item.player_id,
          name: item.players.name,
          goals: 0,
        };
      }
      grouped[item.player_id].goals += item.goals;
    });

    const scorers = Object.values(grouped)
      .sort((a, b) => b.goals - a.goals)
      .slice(0, parseInt(limit));

    res.json(scorers);
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    res.status(500).json({ error: 'Failed to fetch top scorers' });
  }
};

export const getTopAssists = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const { data, error } = await supabase
      .from('attendance')
      .select('player_id, assists, players(id, name)')
      .order('assists', { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    // Group by player and sum assists
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.player_id]) {
        grouped[item.player_id] = {
          player_id: item.player_id,
          name: item.players.name,
          assists: 0,
        };
      }
      grouped[item.player_id].assists += item.assists;
    });

    const assists = Object.values(grouped)
      .sort((a, b) => b.assists - a.assists)
      .slice(0, parseInt(limit));

    res.json(assists);
  } catch (error) {
    console.error('Error fetching top assists:', error);
    res.status(500).json({ error: 'Failed to fetch top assists' });
  }
};

export const getPlayerStatistics = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('player_id, goals, assists, players(id, name)');

    if (error) throw error;

    // Aggregate stats by player
    const stats = {};
    data.forEach((item) => {
      if (!stats[item.player_id]) {
        stats[item.player_id] = {
          player_id: item.player_id,
          name: item.players.name,
          goals: 0,
          assists: 0,
          games: 0,
        };
      }
      stats[item.player_id].goals += item.goals;
      stats[item.player_id].assists += item.assists;
      stats[item.player_id].games += 1;
    });

    const result = Object.values(stats).sort((a, b) => b.goals - a.goals);

    res.json(result);
  } catch (error) {
    console.error('Error fetching player statistics:', error);
    res.status(500).json({ error: 'Failed to fetch player statistics' });
  }
};
