import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>

      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email} - {u.role}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
