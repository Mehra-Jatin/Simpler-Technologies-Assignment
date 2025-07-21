import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import {Toaster} from 'react-hot-toast';
import VerificationPage from './pages/Verify.jsx';
import Shop from './pages/Shop.jsx';
import Orders from './pages/Orders.jsx';
import Navbar from './components/Navbar.jsx';

function App() {

  return (<>
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/verify" element={<VerificationPage/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/shop" element={
          <ProtectedRoute>
            <Navbar />
            <Shop />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Navbar />
            <Orders />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </>
  );
}

export default App;