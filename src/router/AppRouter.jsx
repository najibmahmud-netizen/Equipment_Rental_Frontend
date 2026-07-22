import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Equipment List */}
        <Route
          path="/equipment"
          element={
            <Layout>
              <Equipment />
            </Layout>
          }
        />

        {/* Equipment Details */}
        <Route
          path="/equipment/:id"
          element={
            <Layout>
              <EquipmentDetails />
            </Layout>
          }
        />

        {/* Customer Rentals */}
        <Route
          path="/my-rentals"
          element={
            <Layout>
              <MyRentals />
            </Layout>
          }
        />

        {/* Customer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
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