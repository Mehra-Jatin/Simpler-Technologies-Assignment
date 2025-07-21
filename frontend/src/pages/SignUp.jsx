import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phoneNo || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signUp(form);
      toast.success('Signup successful! Check your email/phone.');
      navigate('/signin');
    } catch {
      toast.error('Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center mb-8">
          Simpler Auth
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300 rounded-lg shadow-md p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
          <UserPlus /> Sign Up
        </h2>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <input
          name="phoneNo"
          type="text"
          value={form.phoneNo}
          onChange={handleChange}
          placeholder="Phone No"
          className="input input-bordered w-full"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full transition ${
            loading
              ? "bg-primary/30 text-gray-300 cursor-not-allowed"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Signing Up...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
