import pool from "../config/db.js";

export const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    const [existing] = await pool.query(
      "SELECT * FROM ratings WHERE user_id=? AND store_id=?",
      [user_id, store_id]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?",
        [rating, user_id, store_id]
      );
    } else {
      await pool.query(
        "INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?)",
        [user_id, store_id, rating]
      );
    }

    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserRatings = async (req, res) => {
  try {
    const [ratings] = await pool.query(
      "SELECT store_id, rating FROM ratings WHERE user_id = ?",
      [req.user.id]
    );
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};