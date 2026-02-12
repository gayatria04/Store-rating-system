import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Name (20-60 characters)"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
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
            placeholder="Address (max 400 chars)"
            value={form.address}
            onChange={(e) => setForm({...form, address: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            maxLength={400}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password (8-16 chars, 1 uppercase, 1 special)"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Register</button>
        <p><Link to="/">Already have an account?</Link></p>
      </form>
    </div>
  );
}

export default Signup;