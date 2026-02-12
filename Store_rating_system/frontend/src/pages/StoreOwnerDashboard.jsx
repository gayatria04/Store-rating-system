import { useEffect, useState } from "react";
import API from "../services/api";

function StoreOwnerDashboard() {
  const [data, setData] = useState({ users: [], averageRating: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/stores/owner/dashboard");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Store Dashboard</h2>
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
        <h3>Average Rating</h3>
        <p style={{ fontSize: "32px" }}>{Number(data.averageRating).toFixed(1)} / 5</p>
      </div>

      <h3>Users Who Rated Your Store</h3>
      {data.users.length === 0 ? (
        <p>No ratings yet</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{u.name}</td>
                <td style={{ padding: "10px" }}>{u.email}</td>
                <td style={{ padding: "10px" }}>{u.rating} / 5</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StoreOwnerDashboard;