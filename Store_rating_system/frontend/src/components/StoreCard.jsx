function StoreCard({ store, onRate }) {
  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p>Overall Rating: {store.overallRating || 0}</p>
      <p>Your Rating: {store.userRating || "Not rated yet"}</p>

      {[1, 2, 3, 4, 5].map((num) => (
        <button key={num} onClick={() => onRate(store.id, num)}>
          {num}
        </button>
      ))}
    </div>
  );
}

export default StoreCard;
