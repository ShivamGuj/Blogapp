const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const register = async (name, email, hashedPassword) => {
  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      throw new Error('User already exists');
    }

    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return user.rows[0];
  } catch (error) {
    throw new Error(error.message); 
  }
};


const findByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message); 
  }
};

const findById = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message); 
  }
};

module.exports = {
  register,
  findByEmail,
  findById,
};
