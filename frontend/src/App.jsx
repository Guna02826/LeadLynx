import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Leads from "./pages/Leads.jsx";
import Campaign from "./pages/Campaign.jsx";
import "react-toastify/dist/ReactToastify.css";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Layout>
                <Register />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Layout>
                <Login />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Layout>
                <Leads />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign"
          element={
            <ProtectedRoute>
              <Layout>
                <Campaign />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;

