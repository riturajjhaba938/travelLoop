const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password, phone, city, country } = req.body;

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db.query(
      'INSERT INTO users (first_name, last_name, email, password_hash, phone, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, first_name',
      [first_name, last_name, email, hashedPassword, phone, city, country]
    );

    const user = newUser.rows[0];
    res.status(201).json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      token: generateToken(user.id),
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && (await comparePassword(password, user.password_hash))) {
      res.json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    next(err);
  }
};
