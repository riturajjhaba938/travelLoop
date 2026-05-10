const db = require('../config/db');
const { checkTripOwnership, checkEntityOwnership } = require('../utils/checkOwnership');

exports.getSections = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
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
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
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
    if (!(await checkEntityOwnership('trip_sections', id, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query(
      'UPDATE trip_sections SET title = COALESCE($1, title), description = COALESCE($2, description), date_from = COALESCE($3, date_from), date_to = COALESCE($4, date_to), budget = COALESCE($5, budget), section_type = COALESCE($6, section_type), order_index = COALESCE($7, order_index) WHERE id = $8 RETURNING *',
      [title, description, date_from, date_to, budget, section_type, order_index, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteSection = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await checkEntityOwnership('trip_sections', id, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await db.query('DELETE FROM trip_sections WHERE id = $1', [id]);
    res.json({ message: 'Section deleted' });
  } catch (err) {
    next(err);
  }
};
