import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import BaseNavbar from "./BaseNavbar";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function InterviewerNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const fullName = user?.fullName || "Interviewer";
  const email = user?.email || "";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const rightContent = (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-xl"
      >
        <div className="h-9 w-9 bg-[#007bff] rounded-xl flex items-center justify-center font-bold">
          {initials}
        </div>

        <div className="hidden md:block text-left">
          <p className="text-xs font-bold">{fullName}</p>
          <p className="text-[10px] text-gray-400">Interviewer</p>
        </div>

        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl text-[#101828] z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-bold truncate">{email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <BaseNavbar
      leftContent={null}
      rightContent={rightContent}
    />
  );
}