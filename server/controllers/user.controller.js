const db = require('../config/db');

exports.updateProfile = async (req, res, next) => {
  const { first_name, last_name, phone, city, country, profile_pic } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), phone = COALESCE($3, phone), city = COALESCE($4, city), country = COALESCE($5, country), profile_pic = COALESCE($6, profile_pic) WHERE id = $7 RETURNING id, first_name, last_name, email, phone, city, country, profile_pic',
      [first_name, last_name, phone, city, country, profile_pic, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Removed duplicate getMe
