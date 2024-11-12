import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/Order/CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar/Navbar";
import ProductDetail from "./components/Food/ProductDetail";
import Menu from "./components/Menu/Menu";
import AdminDashboard from "./components/Management/Dashboard/AdminDashboard";
import EmployeeManagement from "./components/Management/Employees/EmployeeManagement";
import ManagementLayout from "./components/Layout/ManagementLayout";
import ProductManagement from "./components/Management/Products/ProductManagement";
import ManagerLogin from "./components/Login_Signup/ManagerLogin";
import ManagerSignup from "./components/Login_Signup/ManagerSignup";
import Settings from "./components/Management/Setting/Setting";
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manager-login" element={<ManagerLogin />} />
          <Route path="/manager-signup" element={<ManagerSignup />} />
          <Route element={<ManagementLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/employee-management" element={<EmployeeManagement />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add more routes here */}
          </Route>

          <Route
            path="/*"
            element={
              <div
                className={`${theme === "light"
                  ? "bg-white text-black"
                  : "bg-slate-900 text-white"
                  } transition-colors min-h-screen`}
              >
                <Navbar theme={theme} setTheme={setTheme} />
                <Routes>
                  <Route path="/order" element={<Order />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/product/:id" element={<ProductDetail />} /> { }
                </Routes>
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
