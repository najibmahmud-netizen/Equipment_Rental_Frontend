import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Home from "../pages/customer/Home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
          <Route path="/equipment" element={<h1>Equipment Page</h1>} />
          <Route path="/my-rentals" element={<h1>My Rentals</h1>} />
          <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;