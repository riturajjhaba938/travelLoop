const db = require('../config/db');

exports.getAllCities = async (req, res, next) => {
  const { q, featured } = req.query;
  try {
    let query = 'SELECT * FROM cities WHERE 1=1';
    const params = [];

    if (q) {
      params.push(`%${q}%`);
      query += ` AND (name ILIKE $${params.length} OR country ILIKE $${params.length})`;
    }

    if (featured === 'true') {
      query += ' AND popularity >= 4';
    }

    query += ' ORDER BY popularity DESC';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getActivities = async (req, res, next) => {
  const { q, city_id, type } = req.query;
  try {
    let query = 'SELECT a.*, c.name as city_name FROM activities a JOIN cities c ON a.city_id = c.id WHERE 1=1';
    const params = [];

    if (q) {
      params.push(`%${q}%`);
      query += ` AND (a.name ILIKE $${params.length} OR a.description ILIKE $${params.length})`;
    }

    if (city_id) {
      params.push(city_id);
      query += ` AND a.city_id = $${params.length}`;
    }

    if (type) {
      params.push(type);
      query += ` AND a.type = $${params.length}`;
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
