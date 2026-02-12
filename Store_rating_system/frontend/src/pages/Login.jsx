import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      
      if (data.user.role === "ADMIN") navigate("/admin");
      else if (data.user.role === "USER") navigate("/user");
      else navigate("/owner");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
        <p><Link to="/signup">Create an account</Link></p>
      </form>
    </div>
  );
}

export default Login;