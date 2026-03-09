import { supabase } from '../db/supabase.js';

export const getAllPayments = async (req, res) => {
  try {
    const { month, year } = req.query;

    let query = supabase
      .from('payments')
      .select('*, players(id, name)')
      .order('created_at', { ascending: false });

    if (month) query = query.eq('month', parseInt(month));
    if (year) query = query.eq('year', parseInt(year));

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { player_id, amount, status, month, year } = req.body;

    if (!player_id || !amount || !month || !year) {
      return res
        .status(400)
        .json({
          error: 'player_id, amount, month, and year are required',
        });
    }

    const { data, error } = await supabase
      .from('payments')
      .insert([{ player_id, amount, status: status || 'pending', month, year }])
      .select('*, players(id, name)');

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, amount } = req.body;

    const { data, error } = await supabase
      .from('payments')
      .update({ status, amount, updated_at: new Date() })
      .eq('id', id)
      .select('*, players(id, name)');

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('payments').delete().eq('id', id);

    if (error) throw error;

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};

// Get payment summary (adimplentes vs inadimplentes)
export const getPaymentSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    const { data, error } = await supabase
      .from('payments')
      .select('status, players(id, name)')
      .eq('month', parseInt(currentMonth))
      .eq('year', parseInt(currentYear));

    if (error) throw error;

    const paid = data.filter((p) => p.status === 'paid');
    const pending = data.filter((p) => p.status === 'pending');

    res.json({
      paid: paid.length,
      pending: pending.length,
      total: data.length,
      month: currentMonth,
      year: currentYear,
    });
  } catch (error) {
    console.error('Error fetching payment summary:', error);
    res.status(500).json({ error: 'Failed to fetch payment summary' });
  }
};
