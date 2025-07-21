import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import VerificationPage from './pages/Verify.jsx';
import Shop from './pages/Shop.jsx';
import Orders from './pages/Orders.jsx';
import Navbar from './components/Navbar.jsx';
import useAuthStore from './store/authStore.js';
import { useEffect } from 'react';

function App() {
  const { fetchUser, user } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user == null ? <Navigate to="/signin" /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={user == null ? <SignUp /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signin"
            element={user == null ? <SignIn /> : <Navigate to="/dashboard" />}
          />
          <Route path="/verify" 
          element={ user == null ?  <VerificationPage /> : <Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Navbar />
                <Shop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Navbar />
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
