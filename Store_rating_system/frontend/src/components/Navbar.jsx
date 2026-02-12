import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "10px 20px", background: "#333", color: "white", display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "30px", fontWeight: "bold" }}>Welcome {user.name}</span>
      
      <div style={{ display: "flex", gap: "20px" }}>
        {user.role === "ADMIN" && (
          <>
            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
            <Link to="/admin/users" style={{ color: "white", textDecoration: "none" }}>Users</Link>
            <Link to="/admin/stores" style={{ color: "white", textDecoration: "none" }}>Stores</Link>
          </>
        )}
        {user.role === "USER" && (
          <Link to="/user" style={{ color: "white", textDecoration: "none" }}>Browse Stores</Link>
        )}
        {user.role === "STORE_OWNER" && (
          <Link to="/owner" style={{ color: "white", textDecoration: "none" }}>My Store Dashboard</Link>
        )}
        <Link to="/update-password" style={{ color: "white", textDecoration: "none" }}>Change Password</Link>
      </div>
      
      <button 
        onClick={handleLogout}
        style={{ 
          marginLeft: "auto", 
          padding: "5px 15px",
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;