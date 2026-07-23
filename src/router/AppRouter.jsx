import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

// Customer Pages
import Home from "../pages/customer/Home";
import Equipment from "../pages/customer/Equipment";
import EquipmentDetails from "../pages/customer/EquipmentDetails";
import MyRentals from "../pages/customer/MyRentals";
import Dashboard from "../pages/customer/Dashboard";

// Authentication Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddEquipment from "../pages/admin/AddEquipment";
import EditEquipment from "../pages/admin/EditEquipment";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/equipment"
          element={
            <Layout>
              <Equipment />
            </Layout>
          }
        />

        <Route
          path="/equipment/:id"
          element={
            <Layout>
              <EquipmentDetails />
            </Layout>
          }
        />

        {/* Customer Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-rentals"
          element={
            <ProtectedRoute>
              <Layout>
                <MyRentals />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-equipment"
          element={
            <ProtectedRoute adminOnly>
              <Layout>
                <AddEquipment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-equipment/:id"
          element={
            <ProtectedRoute adminOnly>
              <Layout>
                <EditEquipment />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Authentication */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;