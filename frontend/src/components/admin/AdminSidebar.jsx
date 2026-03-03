import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const baseLink =
  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-[#0f172a] border-r border-gray-700 min-h-screen p-4 space-y-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center relative overflow-hidden shadow-md shadow-gray-700">
            <div className="absolute inset-0 bg-gray-900"></div>
            <span className="relative z-10 text-[#008AFF] font-bold text-xl mr-[1px]">
              T
            </span>
            <span className="relative z-10 text-white font-bold text-xl">
              H
            </span>
          </div>

          {!collapsed && (
            <span className="text-white font-bold tracking-tight text-lg">
              TurboHire
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition hidden md:block"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Dashboard */}
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `${baseLink} ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            isActive
              ? "bg-white text-[#0f172a] shadow-md"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`
        }
      >
        <LayoutDashboard size={18} />
        {!collapsed && <span>Dashboard</span>}
      </NavLink>

      {/* Users */}
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `${baseLink} ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            isActive
              ? "bg-white text-[#0f172a] shadow-md"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`
        }
      >
        <Users size={18} />
        {!collapsed && <span>Users</span>}
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;