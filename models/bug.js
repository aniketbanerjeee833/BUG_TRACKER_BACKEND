const pool = require('../config/db');

const logBug = async (email, description) => {
  return pool.query(
    'INSERT INTO bugs (email, error_description) VALUES (?, ?)',
    [email, description]
  );
};

const getAllBugs = async () => {
  const [rows] = await pool.query('SELECT * FROM bugs ORDER BY created_at DESC');
  return rows;
};

module.exports = { logBug, getAllBugs };
