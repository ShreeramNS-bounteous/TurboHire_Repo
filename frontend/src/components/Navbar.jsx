import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import BaseNavbar from "./BaseNavbar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block py-2 text-sm font-medium transition ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  /* =========================
     LEFT SIDE (DESKTOP LINKS)
     ========================= */
  const leftContent = (
    <nav className="hidden md:flex items-center gap-6 ml-6">
      <NavLink to="/recruiter/jobs" className={linkClass}>
        Jobs
      </NavLink>

      <NavLink to="/recruiter/candidates" className={linkClass}>
        Candidates
      </NavLink>

      <NavLink to="/recruiter/interviews" className={linkClass}>
        Interview
      </NavLink>
    </nav>
  );

  /* =========================
     RIGHT SIDE
     ========================= */
  const rightContent = (
    <div className="flex items-center gap-4">

      {/* Desktop user info */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-300 text-sm">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-red-400 transition text-sm"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-300 text-xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>
    </div>
  );

  return (
    <>
      <BaseNavbar
        leftContent={leftContent}
        rightContent={rightContent}
      />

      {/* =========================
         MOBILE DROPDOWN
         ========================= */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f172a] px-6 py-4 space-y-4 border-t border-gray-700">

          <NavLink
            to="/recruiter/jobs"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Jobs
          </NavLink>

          <NavLink
            to="/recruiter/candidates"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Candidates
          </NavLink>

          <NavLink
            to="/recruiter/interviews"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Interview
          </NavLink>

          <div className="border-t border-gray-700 pt-4 mt-4">
            <div className="text-gray-400 text-xs mb-2">
              {user?.email}
            </div>

            <button
              onClick={handleLogout}
              className="text-red-400 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}