import { useEffect, useState } from "react";
import API from "../services/api";

function StoreOwnerDashboard() {
  const [data, setData] = useState({ users: [] });

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
      <h3>Average Rating: {data.averageRating || 0}</h3>

      <h4>Users who rated:</h4>
      {data.users.map((u, i) => (
        <div key={i}>
          {u.name} - {u.email} - Rating: {u.rating}
        </div>
      ))}
    </div>
  );
}

export default StoreOwnerDashboard;
