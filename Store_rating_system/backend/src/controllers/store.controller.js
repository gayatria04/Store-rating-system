import pool from "../config/db.js";

export const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    await pool.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id]
    );

    res.status(201).json({ message: "Store created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const { search = "", sort = "name", order = "ASC" } = req.query;

    const [rows] = await pool.query(
      `
      SELECT s.id, s.name, s.address,
      AVG(r.rating) as overallRating,
      (
        SELECT rating FROM ratings
        WHERE user_id = ? AND store_id = s.id
      ) as userRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.name LIKE ? OR s.address LIKE ?
      GROUP BY s.id
      ORDER BY ${sort} ${order}
      `,
      [req.user.id, `%${search}%`, `%${search}%`]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStoreDashboard = async (req, res) => {
  try {
    const [stores] = await pool.query(
      "SELECT id FROM stores WHERE owner_id = ?",
      [req.user.id]
    );

    if (!stores.length)
      return res.status(404).json({ message: "No store found" });

    const storeId = stores[0].id;

    const [ratings] = await pool.query(
      `
      SELECT u.name, u.email, r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
      `,
      [storeId]
    );

    const [avg] = await pool.query(
      "SELECT AVG(rating) as averageRating FROM ratings WHERE store_id = ?",
      [storeId]
    );

    res.json({
      users: ratings,
      averageRating: avg[0].averageRating
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
