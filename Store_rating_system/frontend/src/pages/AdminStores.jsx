import { useEffect, useState } from "react";
import API from "../services/api";

function AdminStores() {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sort, setSort] = useState({ field: "name", order: "ASC" });
  const [showForm, setShowForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: "", email: "", address: "", owner_id: "" });

  const fetchStores = async () => {
    const params = new URLSearchParams({ ...filters, ...sort });
    const { data } = await API.get(`/admin/stores?${params}`);
    setStores(data);
  };

  const fetchStoreOwners = async () => {
    const { data } = await API.get("/users?role=STORE_OWNER");
    setUsers(data);
  };

  useEffect(() => {
    fetchStores();
    fetchStoreOwners();
  }, [sort]);

  const handleSort = (field) => {
    setSort({
      field,
      order: sort.field === field && sort.order === "ASC" ? "DESC" : "ASC"
    });
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await API.post("/stores", newStore);
      setShowForm(false);
      setNewStore({ name: "", email: "", address: "", owner_id: "" });
      fetchStores();
      alert("Store created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create store");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Store Management</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Store"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddStore} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
          <h3>Add New Store</h3>
          <div style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
            <input
              placeholder="Store Name"
              value={newStore.name}
              onChange={(e) => setNewStore({...newStore, name: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <input
              type="email"
              placeholder="Store Email"
              value={newStore.email}
              onChange={(e) => setNewStore({...newStore, email: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <input
              placeholder="Store Address"
              value={newStore.address}
              onChange={(e) => setNewStore({...newStore, address: e.target.value})}
              required
              style={{ padding: "8px" }}
            />
            <select
              value={newStore.owner_id}
              onChange={(e) => setNewStore({...newStore, owner_id: e.target.value})}
              required
              style={{ padding: "8px" }}
            >
              <option value="">Select Store Owner</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
              ))}
            </select>
            <button type="submit" style={{ padding: "10px", background: "#28a745", color: "white", border: "none" }}>
              Create Store
            </button>
          </div>
        </form>
      )}

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => setFilters({...filters, name: e.target.value})}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          placeholder="Filter by Email"
          value={filters.email}
          onChange={(e) => setFilters({...filters, email: e.target.value})}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          placeholder="Filter by Address"
          value={filters.address}
          onChange={(e) => setFilters({...filters, address: e.target.value})}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button onClick={fetchStores} style={{ padding: "8px 16px" }}>Apply Filters</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Store Name {sort.field === "name" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Email {sort.field === "email" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("address")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Address {sort.field === "address" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("rating")} style={{ cursor: "pointer", padding: "12px", textAlign: "left" }}>
              Rating {sort.field === "rating" && (sort.order === "ASC" ? "↑" : "↓")}
            </th>
            <th style={{ padding: "12px", textAlign: "left" }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>No stores found</td>
            </tr>
          ) : (
            stores.map(store => (
              <tr key={store.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{store.name}</td>
                <td style={{ padding: "12px" }}>{store.email}</td>
                <td style={{ padding: "12px" }}>{store.address}</td>
                <td style={{ padding: "12px" }}>{Number(store.rating || 0).toFixed(1)} / 5</td>
                <td style={{ padding: "12px" }}>{store.owner_name || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStores;