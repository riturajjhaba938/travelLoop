const db = require('../config/db');

exports.getNotes = async (req, res, next) => {
  const { tripId } = req.params;
  try {
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
    const result = await db.query(
      'INSERT INTO trip_notes (trip_id, day_number, content) VALUES ($1, $2, $3) RETURNING *',
      [tripId, day_number, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM trip_notes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};
