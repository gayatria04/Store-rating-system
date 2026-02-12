import { useState } from "react";
import API from "../services/api";

function UpdatePassword() {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put("/users/update-password", form);
    alert("Password updated");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
      />
      <button>Update</button>
    </form>
  );
}

export default UpdatePassword;
