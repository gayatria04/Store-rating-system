import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function AdminUserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/users/${id}`);
        setUser(data);
      } catch (err) {
        alert("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <Link to="/admin/users" style={{ marginBottom: "20px", display: "block" }}>← Back to Users</Link>
      
      <h2>User Details</h2>
      
      <div style={{ border: "1px solid #ccc", padding: "20px", maxWidth: "500px" }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === "STORE_OWNER" && (
          <p><strong>Store Rating:</strong> {Number(user.store_rating || 0).toFixed(1)} / 5</p>
        )}
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}

export default AdminUserDetail;