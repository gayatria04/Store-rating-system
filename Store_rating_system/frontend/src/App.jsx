import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminStores from "./pages/AdminStores";
import AdminUserDetail from "./pages/AdminUserDetail";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import UpdatePassword from "./pages/UpdatePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/:id" element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminUserDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin/stores" element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminStores />
              </ProtectedRoute>
            } />

            {/* User Routes */}
            <Route path="/user" element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            } />

            {/* Store Owner Routes */}
            <Route path="/owner" element={
              <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                <StoreOwnerDashboard />
              </ProtectedRoute>
            } />

            {/* Common Routes */}
            <Route path="/update-password" element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN", "STORE_OWNER"]}>
                <UpdatePassword />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;