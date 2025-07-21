
import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get('/api/user', { withCredentials: true });
      set({ user: res.data, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  login: async (identifier, password) => {
    const res = await axios.post('/api/login', { identifier, password }, { withCredentials: true });
    set({ user: res.data.user });
  },

  signUp: async (payload) => {
    await axios.post('/api/signup', payload, { withCredentials: true });
  },

  logout: async () => {
    await axios.post('/api/logout', {}, { withCredentials: true });
    set({ user: null });
  },

  refreshToken: async () => {
    try {
      await axios.post('/api/refresh', {}, { withCredentials: true });
    } catch (err) {
      set({ user: null });
    }
  }
}));

export default useAuthStore;