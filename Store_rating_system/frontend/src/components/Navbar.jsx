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
    <nav style={{ padding: "10px", background: "#eee" }}>
      <span>Welcome {user.name}</span>

      {user.role === "ADMIN" && <Link to="/admin"> Admin </Link>}
      {user.role === "USER" && <Link to="/user"> Stores </Link>}
      {user.role === "STORE_OWNER" && <Link to="/owner"> Dashboard </Link>}

      <Link to="/update-password"> Update Password </Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
