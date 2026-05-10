const db = require('../config/db');
const { checkTripOwnership, checkEntityOwnership } = require('../utils/checkOwnership');

exports.getNotes = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query(
      'SELECT * FROM trip_notes WHERE trip_id = $1 ORDER BY day_number ASC, created_at ASC',
      [tripId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.addNote = async (req, res, next) => {
  const { tripId } = req.params;
  const { day_number, content } = req.body;
  try {
    if (!(await checkTripOwnership(tripId, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query(
      'INSERT INTO trip_notes (trip_id, day_number, content) VALUES ($1, $2, $3) RETURNING *',
      [tripId, day_number, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { day_number, content } = req.body;
  try {
    if (!(await checkEntityOwnership('trip_notes', id, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const result = await db.query(
      'UPDATE trip_notes SET day_number = COALESCE($1, day_number), content = COALESCE($2, content) WHERE id = $3 RETURNING *',
      [day_number, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await checkEntityOwnership('trip_notes', id, req.user.id))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await db.query('DELETE FROM trip_notes WHERE id = $1', [id]);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};
