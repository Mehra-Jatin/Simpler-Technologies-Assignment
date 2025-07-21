import useAuthStore from '../store/authStore';
import { useEffect,useState} from 'react';
const Dashboard = () => {
  const { user , fetchUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setLoading(false);
    };
    loadUser();
  }, [fetchUser]);
  return (
    loading ? (
      <div className="text-center py-20">Loading...</div>
    ) : (
      <div className="min-h-screen bg-base-50 flex flex-col items-center px-4 py-6">
        {/* ID Card */}
        <div className="bg-base-100 border border-base-300 rounded-lg shadow-xl p-10 w-80 h-[600px] flex flex-col items-center relative">
          <h2 className="text-xl font-bold text-white mb-3">USER PROFILE</h2>

        <div className="w-24 h-24 rounded-full bg-base-300 mb-4 flex items-center justify-center overflow-hidden">
          <img
            src="/Avatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Simpler Auth</h1>
        <div className="w-full border-t border-base-300 mb-2"></div>
        <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
        <div className="w-full border-t border-base-300 mt-2 mb-8"></div>

        <div className="space-y-5 w-full text-sm text-purple-400">
          <div>Email: <span className="text-white">{user?.email}</span></div>
          <div>Phone: <span className="text-white">{user?.phoneNo}</span></div>
          <div>Status: <span className="text-white">{user?.isVerified ? 'Verified' : 'Unverified'}</span></div>
          <div>Joined: <span className="text-white">{new Date(user?.createdAt).toLocaleDateString()}</span></div>
          <div>Updated: <span className="text-white">{new Date(user?.updatedAt).toLocaleDateString()}</span></div>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col items-end text-xs text-gray-400">
          <span className="italic text-blue-400">Signature</span>
          <span>Platform Admin</span>
        </div>
      </div>
    </div>
  ));
};

export default Dashboard;
