import { supabase } from '../db/supabase.js';

export const getCashBalance = async (req, res) => {
  try {
    const { data, error } = await supabase.from('cash_flow').select('type, amount');

    if (error) throw error;

    const balance = data.reduce((sum, item) => {
      if (item.type === 'income') return sum + parseFloat(item.amount);
      if (item.type === 'expense') return sum - parseFloat(item.amount);
      return sum;
    }, 0);

    res.json({ balance: parseFloat(balance.toFixed(2)) });
  } catch (error) {
    console.error('Error fetching cash balance:', error);
    res.status(500).json({ error: 'Failed to fetch cash balance' });
  }
};

export const getCashHistory = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const { data, error } = await supabase
      .from('cash_flow')
      .select('*')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching cash history:', error);
    res.status(500).json({ error: 'Failed to fetch cash history' });
  }
};

export const recordCashFlow = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !amount) {
      return res.status(400).json({ error: 'type and amount are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'type must be "income" or "expense"' });
    }

    const { data, error } = await supabase
      .from('cash_flow')
      .insert([{ type, amount: parseFloat(amount), description }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error recording cash flow:', error);
    res.status(500).json({ error: 'Failed to record cash flow' });
  }
};

export const deleteCashFlow = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('cash_flow')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Cash flow record deleted successfully' });
  } catch (error) {
    console.error('Error deleting cash flow:', error);
    res.status(500).json({ error: 'Failed to delete cash flow' });
  }
};

export const getCashSummary = async (req, res) => {
  try {
    const { data, error } = await supabase.from('cash_flow').select('type, amount');

    if (error) throw error;

    const income = data
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const expenses = data
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const balance = income - expenses;

    res.json({
      income: parseFloat(income.toFixed(2)),
      expenses: parseFloat(expenses.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
    });
  } catch (error) {
    console.error('Error fetching cash summary:', error);
    res.status(500).json({ error: 'Failed to fetch cash summary' });
  }
};
