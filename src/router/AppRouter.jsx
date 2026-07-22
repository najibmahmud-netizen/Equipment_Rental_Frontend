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
import AddEquipment from "../pages/admin/AddEquipment";
import EditEquipment from "../pages/admin/EditEquipment";

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

        {/* Equipment */}
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

        {/* Customer */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/my-rentals"
          element={
            <Layout>
              <MyRentals />
            </Layout>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />

        <Route
          path="/admin/add-equipment"
          element={
            <Layout>
              <AddEquipment />
            </Layout>
          }
        />

        <Route
          path="/admin/edit-equipment/:id"
          element={
            <Layout>
              <EditEquipment />
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