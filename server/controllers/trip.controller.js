const db = require('../config/db');

exports.getAllTrips = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.createTrip = async (req, res, next) => {
  const { name, place, start_date, end_date, status, cover_photo } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO trips (user_id, name, place, start_date, end_date, status, cover_photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, name, place, start_date, end_date, status || 'upcoming', cover_photo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM trips WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  const { name, place, start_date, end_date, status, cover_photo, is_public } = req.body;
  try {
    const result = await db.query(
      'UPDATE trips SET name = $1, place = $2, start_date = $3, end_date = $4, status = $5, cover_photo = $6, is_public = $7 WHERE id = $8 AND user_id = $9 RETURNING *',
      [name, place, start_date, end_date, status, cover_photo, is_public, req.params.id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const result = await db.query('DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    next(err);
  }
};
