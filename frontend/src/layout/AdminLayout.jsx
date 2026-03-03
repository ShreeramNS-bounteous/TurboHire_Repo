import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex bg-[#0f172a] min-h-screen">

      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col">
        <AdminNavbar setMobileOpen={setMobileOpen} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}