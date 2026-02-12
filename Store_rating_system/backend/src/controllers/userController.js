import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: "Name must be 20-60 characters" });
    }
    if (address && address.length > 400) {
      return res.status(400).json({ message: "Address max 400 characters" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?,?,?,?,?)",
      [name, email, hashed, address, role]
    );

    res.status(201).json({ message: "User created" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role, sort = "name", order = "ASC" } = req.query;
    
    let query = `SELECT id, name, email, address, role,
      CASE WHEN role = 'STORE_OWNER' 
        THEN (SELECT AVG(r.rating) FROM ratings r 
              JOIN stores s ON r.store_id = s.id WHERE s.owner_id = users.id)
        ELSE NULL END as store_rating
      FROM users WHERE 1=1`;
    const values = [];

    if (name) { query += " AND name LIKE ?"; values.push(`%${name}%`); }
    if (email) { query += " AND email LIKE ?"; values.push(`%${email}%`); }
    if (address) { query += " AND address LIKE ?"; values.push(`%${address}%`); }
    if (role) { query += " AND role = ?"; values.push(role); }

    query += ` ORDER BY ${sort} ${order}`;
    const [rows] = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, address, role,
        (SELECT AVG(r.rating) FROM ratings r 
         JOIN stores s ON r.store_id = s.id 
         WHERE s.owner_id = users.id) as store_rating
       FROM users WHERE id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    const user = rows[0];

    if (!await bcrypt.compare(oldPassword, user.password)) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must be 8-16 chars with 1 uppercase & 1 special" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashed, req.user.id]);
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};