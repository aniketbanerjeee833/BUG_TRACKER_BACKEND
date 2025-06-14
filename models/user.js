const pool = require('../config/db');

// Get a user by username

const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // only first match
};

// Create a new user
const createUser = async (username, email, hashedPassword, role = 'USER') => {
  await pool.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, role]
  );
};
module.exports = {
  getUserByEmail,
  createUser,
};
