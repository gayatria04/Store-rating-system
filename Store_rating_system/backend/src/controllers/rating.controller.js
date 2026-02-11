import pool from "../config/db.js";

export const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;

    await pool.query(
      `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = ?
      `,
      [req.user.id, store_id, rating, rating]
    );

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
