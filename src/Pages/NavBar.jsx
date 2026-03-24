import React, { useState } from "react";
import {
  School,
  Building2,
  Stethoscope,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Menu, // Added for mobile button
  X,    // Added for close button
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const branches = [
    { name: "PU Colleges", icon: <GraduationCap size={20} />, count: 4, Page: "puc" },
    { name: "Paramedical", icon: <Stethoscope size={20} />, count: 2, Page: "paramedical" },
    { name: "Degree Colleges", icon: <Building2 size={20} />, count: 3, Page: "degreeColleges" },
    { name: "Primary Schools", icon: <School size={20} />, count: 6, Page: "primarySchools" },
    { name: "High Schools", icon: <BookOpen size={20} />, count: 5, Page: "highSchools" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-800">
        <h1 className="font-bold">EduTrust</h1>
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-800 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}
        <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">EduTrust Admin</h1>
            <p className="text-xs text-slate-400 mt-1">Central Management System</p>
          </div>
          {/* Close button inside sidebar for mobile only */}
          <button onClick={toggleSidebar} className="md:hidden p-1">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)} // Close on click for mobile
            className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg"
          >
            <LayoutDashboard size={20} />
            <span>Global Overview</span>
          </Link>

          <div className="pt-4 pb-2 text-xs text-slate-500 uppercase px-3">
            Institutions
          </div>

          {branches.map((branch) => (
            <NavLink
              key={branch.name}
              to={`/${branch.Page}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex justify-between items-center p-3 rounded-lg transition-all ${
                  isActive ? "bg-white shadow-sm" : "hover:bg-slate-800 text-slate-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`flex items-center gap-3 ${isActive ? "text-blue-600 font-bold" : "text-inherit"}`}>
                    {branch.icon}
                    <span className="text-sm">{branch.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-blue-100 text-blue-700" : "bg-slate-700 text-slate-400"
                  }`}>
                    {branch.count}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <NavLink 
                to='/controllpanel' 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-white text-blue-600 font-bold shadow-sm" : "hover:bg-slate-800 text-slate-400"}`}
            >
                Settings
            </NavLink>
            <NavLink 
                to='/studentportal' 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-white text-blue-600 font-bold shadow-sm" : "hover:bg-slate-800 text-slate-400"}`}
            >
                Student Portal
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* --- OVERLAY (Click to close when mobile menu is open) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;