import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/dashboard/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {stats && (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ border: "1px solid #ccc", padding: "20px" }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: "24px" }}>{stats.totalUsers}</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "20px" }}>
            <h3>Total Stores</h3>
            <p style={{ fontSize: "24px" }}>{stats.totalStores}</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "20px" }}>
            <h3>Total Ratings</h3>
            <p style={{ fontSize: "24px" }}>{stats.totalRatings}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;