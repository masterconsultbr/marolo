import { supabase } from '../db/supabase.js';

export const getAllGames = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

export const createGame = async (req, res) => {
  try {
    const { date, opponent, notes } = req.body;

    if (!date || !opponent) {
      return res.status(400).json({ error: 'date and opponent are required' });
    }

    const { data, error } = await supabase
      .from('games')
      .insert([{ date, opponent, notes }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
};

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, opponent, notes } = req.body;

    const { data, error } = await supabase
      .from('games')
      .update({ date, opponent, notes, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Failed to update game' });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('games').delete().eq('id', id);

    if (error) throw error;

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Failed to delete game' });
  }
};
