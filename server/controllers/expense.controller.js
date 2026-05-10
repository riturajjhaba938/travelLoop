const db = require('../config/db');
const { checkTripOwnership, checkEntityOwnership } = require('../utils/checkOwnership');

exports.getExpenses = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query('SELECT * FROM expenses WHERE trip_id = $1 ORDER BY created_at DESC', [tripId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.addExpense = async (req, res, next) => {
  const { tripId } = req.params;
  const { section_id, category, description, qty, unit, unit_cost } = req.body;
  
  // Strict validation for numbers
  const q = Number(qty);
  const cost = Number(unit_cost);
  
  if (qty === null || unit_cost === null || isNaN(q) || isNaN(cost)) {
    return res.status(400).json({ message: 'Quantity and unit cost must be valid numbers' });
  }
  
  const amount = q * cost;

  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query(
      'INSERT INTO expenses (trip_id, section_id, category, description, qty, unit, unit_cost, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [tripId, section_id, category, description, q, unit, cost, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await checkEntityOwnership('expenses', id, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await db.query('DELETE FROM expenses WHERE id = $1', [id]);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getBudgetSummary = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const plannedResult = await db.query(
      'SELECT SUM(budget) as total_planned FROM trip_sections WHERE trip_id = $1',
      [tripId]
    );
    const spentResult = await db.query(
      'SELECT SUM(amount) as total_spent FROM expenses WHERE trip_id = $1',
      [tripId]
    );
    
    res.json({
      trip_id: tripId,
      total_planned: parseFloat(plannedResult.rows[0].total_planned || 0),
      total_spent: parseFloat(spentResult.rows[0].total_spent || 0),
      remaining: parseFloat(plannedResult.rows[0].total_planned || 0) - parseFloat(spentResult.rows[0].total_spent || 0)
    });
  } catch (err) {
    next(err);
  }
};

exports.getBudgetBreakdown = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const categoryBreakdown = await db.query(
      'SELECT category, SUM(amount) as total FROM expenses WHERE trip_id = $1 GROUP BY category',
      [tripId]
    );
    const sectionBreakdown = await db.query(
      'SELECT ts.title, SUM(e.amount) as total FROM expenses e JOIN trip_sections ts ON e.section_id = ts.id WHERE e.trip_id = $1 GROUP BY ts.title',
      [tripId]
    );
    
    res.json({
      by_category: categoryBreakdown.rows,
      by_section: sectionBreakdown.rows
    });
  } catch (err) {
    next(err);
  }
};

exports.getInvoice = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const tripResult = await db.query(
      'SELECT t.*, u.first_name, u.last_name, u.email FROM trips t JOIN users u ON t.user_id = u.id WHERE t.id = $1',
      [tripId]
    );
    
    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const expensesResult = await db.query(
      'SELECT e.*, ts.title as section_name FROM expenses e LEFT JOIN trip_sections ts ON e.section_id = ts.id WHERE e.trip_id = $1 ORDER BY e.created_at ASC',
      [tripId]
    );

    const summaryResult = await db.query(
      'SELECT (SELECT SUM(budget) FROM trip_sections WHERE trip_id = $1) as total_budget, SUM(amount) as total_spent FROM expenses WHERE trip_id = $1',
      [tripId]
    );

    const summary = summaryResult.rows[0];

    res.json({
      trip: tripResult.rows[0],
      expenses: expensesResult.rows,
      totals: {
        planned: parseFloat(summary.total_budget || 0),
        spent: parseFloat(summary.total_spent || 0),
        balance: parseFloat(summary.total_budget || 0) - parseFloat(summary.total_spent || 0)
      }
    });
  } catch (err) {
    next(err);
  }
};
