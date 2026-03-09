import { supabase } from '../db/supabase.js';

export const getAttendanceByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const { data, error } = await supabase
      .from('attendance')
      .select('*, players(id, name), games(id, date, opponent)')
      .eq('game_id', gameId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

export const recordAttendance = async (req, res) => {
  try {
    const { player_id, game_id, goals, assists } = req.body;

    if (!player_id || !game_id) {
      return res
        .status(400)
        .json({ error: 'player_id and game_id are required' });
    }

    const { data, error } = await supabase
      .from('attendance')
      .insert([{ player_id, game_id, goals: goals || 0, assists: assists || 0 }])
      .select('*, players(id, name)');

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { goals, assists } = req.body;

    const { data, error } = await supabase
      .from('attendance')
      .update({ goals, assists, updated_at: new Date() })
      .eq('id', id)
      .select('*, players(id, name)');

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('attendance')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ error: 'Failed to delete attendance' });
  }
};

export const getPlayerStats = async (req, res) => {
  try {
    const { playerId } = req.params;

    const { data, error } = await supabase
      .from('attendance')
      .select('goals, assists')
      .eq('player_id', playerId);

    if (error) throw error;

    const stats = {
      totalGames: data.length,
      totalGoals: data.reduce((sum, a) => sum + a.goals, 0),
      totalAssists: data.reduce((sum, a) => sum + a.assists, 0),
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
};
