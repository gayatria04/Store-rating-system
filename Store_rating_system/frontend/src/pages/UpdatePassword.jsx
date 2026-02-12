import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function UpdatePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/update-password", form);
      setMessage("Password updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Update Password</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={(e) => setForm({...form, oldPassword: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="New Password (8-16 chars, 1 uppercase, 1 special)"
            value={form.newPassword}
            onChange={(e) => setForm({...form, newPassword: e.target.value})}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default UpdatePassword;