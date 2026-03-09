import { supabase } from '../db/supabase.js';

export const getAllPlayers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const { name, position } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const { data, error } = await supabase
      .from('players')
      .insert([{ name, position }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Failed to create player' });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position } = req.body;

    const { data, error } = await supabase
      .from('players')
      .update({ name, position, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Failed to update player' });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Failed to delete player' });
  }
};
