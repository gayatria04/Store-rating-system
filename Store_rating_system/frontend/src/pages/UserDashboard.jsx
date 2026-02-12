import { useEffect, useState } from "react";
import API from "../services/api";
import StoreCard from "../components/StoreCard";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = async () => {
    const { data } = await API.get(`/stores?search=${search}`);
    setStores(data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const rateStore = async (storeId, rating) => {
    await API.post("/ratings", { store_id: storeId, rating });
    fetchStores();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Browse Stores</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={fetchStores}>Search</button>
      </div>

      {stores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        stores.map(store => (
          <StoreCard key={store.id} store={store} onRate={rateStore} />
        ))
      )}
    </div>
  );
}

export default UserDashboard;