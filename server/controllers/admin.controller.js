const db = require('../config/db');

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await db.query('SELECT COUNT(*) FROM users');
    const totalTrips = await db.query('SELECT COUNT(*) FROM trips');
    const popularCities = await db.query(
      'SELECT c.name, COUNT(t.id) as trip_count FROM cities c JOIN trips t ON t.place ILIKE \'%\' || c.name || \'%\' GROUP BY c.name ORDER BY trip_count DESC LIMIT 5'
    );
    const tripStatus = await db.query(
      'SELECT status, COUNT(*) FROM trips GROUP BY status'
    );

    res.json({
      users: parseInt(totalUsers.rows[0].count),
      trips: parseInt(totalTrips.rows[0].count),
      popular_cities: popularCities.rows,
      status_distribution: tripStatus.rows
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT id, first_name, last_name, email, city, country, is_admin, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
