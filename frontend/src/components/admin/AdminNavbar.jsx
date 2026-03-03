import { Menu } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-[#101828] border-b border-gray-700 px-6 py-4 flex justify-between items-center text-white">

      {/* Mobile Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      <h1 className="text-lg font-semibold hidden md:block">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-gray-900 hover:bg-red-600 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;