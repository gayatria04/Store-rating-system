function StoreCard({ store, onRate }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "15px" }}>
      <h3>{store.name}</h3>
      <p><strong>Address:</strong> {store.address}</p>
      <p><strong>Overall Rating:</strong> {Number(store.overallRating || 0).toFixed(1)} / 5</p>
      <p><strong>Your Rating:</strong> {store.userRating || "Not rated"}</p>
      
      <div>
        {[1,2,3,4,5].map(num => (
          <button 
            key={num} 
            onClick={() => onRate(store.id, num)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: store.userRating === num ? "#007bff" : "#f0f0f0",
              color: store.userRating === num ? "white" : "black"
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StoreCard;