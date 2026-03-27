import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  IndianRupee,
  FileText,
  ClipboardList,
  BarChart3,
  Building2,
  UserCog,
  Settings,
  Database,
  LogOut,
} from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Student Management", icon: Users, path: "/students" },
    { name: "Fee Collection", icon: IndianRupee, path: "/fees" },
    { name: "Fee Receipt", icon: FileText, path: "/receipt" },
    { name: "Fee Register", icon: ClipboardList, path: "/register" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
    { name: "Branch Management", icon: Building2, path: "/branch" },
    { name: "User Management", icon: UserCog, path: "/users" },
    { name: "Company Profile", icon: Settings, path: "/company" },
    { name: "Backup & Restore", icon: Database, path: "/backup" },
    { name: "registration", icon: Database, path: "/studentmanagement/registration" },

  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-xl transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">🏫 ABC School</h2>
          <p className="text-sm text-gray-500">Main Branch</p>
        </div>

        {/* Menu */}
        <div className="p-3 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-0 w-full p-4 border-t space-y-2">
          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <Settings size={18} /> Change Password
          </NavLink>

          <NavLink
            to="/logout"
            className="flex items-center gap-2 p-2 text-red-500 hover:bg-red-100 rounded-lg"
          >
            <LogOut size={18} /> Logout
          </NavLink>
        </div>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)}>
              <Menu />
            </button>

            <h1 className="text-lg font-semibold text-gray-700">
              Dashboard
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Administrator</p>
              <p className="text-xs text-gray-500">ADMIN</p>
            </div>

            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
              A
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;