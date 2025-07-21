import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  login: async (identifier, password) => {
    try {
      const res = await axiosInstance.post('/api/auth/login', { identifier, password });
      set({ user: res.data.user });
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  },

  signUp: async (payload) => {
    try {
      const res =await axiosInstance.post('/api/auth/signup', payload);
       if(res.status === 201) {
        toast.success("Signup successful! Check your email/phone.");
       }
       else {
        toast.error("Signup failed. Please try again.");
       }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      set({ user: null });
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  refreshToken: async () => {
    try {
      const res = await axiosInstance.post('/api/auth/refresh-token');
      return res.status === 200;
    } catch (err) {
      return false;
    }
  },

  fetchUser: async () => {
    try {
      const res = await axiosInstance.get('/api/auth/me');
      set({ user: res.data.user, loading: false });

    } catch (err) {
      const refreshed = await get().refreshToken();
      if (refreshed) {
        try {
          const res = await axiosInstance.get('/api/auth/me');
          set({ user: res.data.user, loading: false });
        } catch {
          set({ user: null, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    }
  },

   verifyCode: async (verificationCode) => {
    try {
      const res = await axiosInstance.post('/api/auth/verify', { verificationCode });
      if (res.status === 200) {
        set({ user: res.data.user });
        toast.success("Verification successful");
      } else {
        toast.error("Verification failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  },

}));

export default useAuthStore;
