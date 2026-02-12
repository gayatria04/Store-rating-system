import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
  const [sort, setSort] = useState({ field: "name", order: "ASC" });
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", address: "", role: "USER" });

  const fetchUsers = async () => {
    const params = new URLSearchParams({ ...filters, ...sort });
    const { data } = await API.get(`/users?${params}`);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [sort]);

  const handleSort = (field) => {
    setSort({
      field,
      order: sort.field === field && sort.order === "ASC" ? "DESC" : "ASC"
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", newUser);
      setShowForm(false);
      setNewUser({ name: "", email: "", password: "", address: "", role: "USER" });
      fetchUsers();
      alert("User created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>User Management</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
          <h3>Add New User</h3>
          <div style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
            <input
              placeholder="Name (20-60 chars)"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <input
              type="password"
              placeholder="Password (8-16 chars, 1 uppercase, 1 special)"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <input
              placeholder="Address (max 400 chars)"
              value={newUser.address}
              onChange={(e) => setNewUser({...newUser, address: e.target.value})}
              style={{ padding: "8px" }}
              maxLength={400}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              style={{ padding: "8px" }}
            >
              <option value="USER">Normal User</option>
              <option value="ADMIN">Admin</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
            <button type="submit" style={{ padding: "10px", background: "#28a745", color: "white", border: "none" }}>
              Create User
            </button>
          </div>
        </form>
      )}

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => setFilters({...filters, name: e.target.value})}
          style={{ padding: "8px", flex: "1" }}
        />
        <input
          placeholder="Filter by Email"
          value={filters.email}
          onChange={(e) => setFilters({...filters, email: e.target.value})}
          style={{ padding: "8px", flex: "1" }}
        />
        <input
          placeholder="Filter by Address"
          value={filters.address}
          onChange={(e) => setFilters({...filters, address: e.target.value})}
          style={{ padding: "8px", flex: "1" }}
        />
        <select
          value={filters.role}
          onChange={(e) => setFilters({...filters, role: e.target.value})}
          style={{ padding: "8px", flex: "0.5" }}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
        <button onClick={fetchUsers} style={{ padding: "8px 20px" }}>Apply</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Name {sort.field === "name" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Email {sort.field === "email" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("address")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Address {sort.field === "address" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("role")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Role {sort.field === "role" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th style={{ padding: "12px", textAlign: "left" }}>Store Rating</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{user.name}</td>
                <td style={{ padding: "12px" }}>{user.email}</td>
                <td style={{ padding: "12px" }}>{user.address || "-"}</td>
                <td style={{ padding: "12px" }}>{user.role}</td>
                <td style={{ padding: "12px" }}>
                  {user.role === "STORE_OWNER" ? Number(user.store_rating || 0).toFixed(1) : "-"}
                </td>
                <td style={{ padding: "12px" }}>
                  <Link to={`/admin/users/${user.id}`} style={{ marginRight: "10px" }}>View</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;