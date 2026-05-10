const db = require('../config/db');

exports.getSections = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM trip_sections WHERE trip_id = $1 ORDER BY order_index ASC',
      [tripId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.addSection = async (req, res, next) => {
  const { tripId } = req.params;
  const { title, description, date_from, date_to, budget, section_type, order_index } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO trip_sections (trip_id, title, description, date_from, date_to, budget, section_type, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [tripId, title, description, date_from, date_to, budget, section_type, order_index]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateSection = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, date_from, date_to, budget, section_type, order_index } = req.body;
  try {
    const result = await db.query(
      'UPDATE trip_sections SET title = $1, description = $2, date_from = $3, date_to = $4, budget = $5, section_type = $6, order_index = $7 WHERE id = $8 RETURNING *',
      [title, description, date_from, date_to, budget, section_type, order_index, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteSection = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM trip_sections WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.json({ message: 'Section deleted' });
  } catch (err) {
    next(err);
  }
};
