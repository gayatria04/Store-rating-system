import pool from "../config/db.js";
import bcrypt from "bcryptjs";


export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, address, role]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role, sort = "name", order = "ASC" } = req.query;

    let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
    const values = [];

    if (name) {
      query += " AND name LIKE ?";
      values.push(`%${name}%`);
    }

    if (email) {
      query += " AND email LIKE ?";
      values.push(`%${email}%`);
    }

    if (address) {
      query += " AND address LIKE ?";
      values.push(`%${address}%`);
    }

    if (role) {
      query += " AND role = ?";
      values.push(role);
    }

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
      "SELECT id, name, email, address, role FROM users WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length)
      return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [req.user.id]
    );

    const user = rows[0];

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashed, req.user.id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
