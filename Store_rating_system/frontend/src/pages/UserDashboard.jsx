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
    <div>
      <h2>All Stores</h2>

      <input
        placeholder="Search by name or address"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchStores}>Search</button>

      {stores.map((store) => (
        <StoreCard key={store.id} store={store} onRate={rateStore} />
      ))}
    </div>
  );
}

export default UserDashboard;
