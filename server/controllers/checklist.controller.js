const db = require('../config/db');

exports.getChecklist = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM checklist_items WHERE trip_id = $1 ORDER BY created_at ASC',
      [tripId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.addItem = async (req, res, next) => {
  const { tripId } = req.params;
  const { category, item_name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO checklist_items (trip_id, category, item_name) VALUES ($1, $2, $3) RETURNING *',
      [tripId, category, item_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { is_checked, item_name, category } = req.body;
  try {
    const result = await db.query(
      'UPDATE checklist_items SET is_checked = COALESCE($1, is_checked), item_name = COALESCE($2, item_name), category = COALESCE($3, category) WHERE id = $4 RETURNING *',
      [is_checked, item_name, category, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM checklist_items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
