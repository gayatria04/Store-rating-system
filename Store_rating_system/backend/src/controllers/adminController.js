import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [[users]] = await pool.query("SELECT COUNT(*) as total FROM users");
    const [[stores]] = await pool.query("SELECT COUNT(*) as total FROM stores");
    const [[ratings]] = await pool.query("SELECT COUNT(*) as total FROM ratings");
    res.json({
      totalUsers: users.total,
      totalStores: stores.total,
      totalRatings: ratings.total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStoresAdmin = async (req, res) => {
  try {
    const { name, email, address, sort = "name", order = "ASC" } = req.query;
    
    let query = `SELECT s.*, COALESCE(AVG(r.rating),0) as rating 
      FROM stores s LEFT JOIN ratings r ON s.id = r.store_id WHERE 1=1`;
    const values = [];

    if (name) { query += " AND s.name LIKE ?"; values.push(`%${name}%`); }
    if (email) { query += " AND s.email LIKE ?"; values.push(`%${email}%`); }
    if (address) { query += " AND s.address LIKE ?"; values.push(`%${address}%`); }

    query += ` GROUP BY s.id ORDER BY ${sort} ${order}`;
    const [stores] = await pool.query(query, values);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};