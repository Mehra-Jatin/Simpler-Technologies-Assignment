import React from 'react';
import { ShoppingCart, List, LogOut ,User} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
      navigate('/signin');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="w-full  flex justify-between items-center mb-6 px-20 py-5 border-b border-base-300">
      <h2 className="text-2xl font-bold text-white">Simpler Auth</h2>
      <div className="flex gap-2">
        <button
          className="btn btn-sm flex items-center gap-1 hover:bg-primary/20 transition"
          onClick={() => navigate('/dashboard')}
        >
          <User size={16} /> Profile
        </button>
        
        <button
          className="btn btn-sm flex items-center gap-1 hover:bg-primary/20 transition"
          onClick={() => navigate('/shop')}
        >
          <ShoppingCart size={16} /> Shop
        </button>
        <button
          className="btn btn-sm flex items-center gap-1 hover:bg-primary/20 transition"
          onClick={() => navigate('/orders')}
        >
          <List size={16} /> Orders
        </button>
        <button
          className="btn btn-sm flex items-center gap-1 hover:bg-red-500/20 text-red-500 transition"
          onClick={handleLogout}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
