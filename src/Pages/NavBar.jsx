import React from "react";
import {
  School,
  Building2,
  Stethoscope,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const branches = [
    { name: "PU Colleges", icon: <GraduationCap size={20} />, count: 4, Page: "puc" },
    { name: "Paramedical", icon: <Stethoscope size={20} />, count: 2, Page: "paramedical" },
    { name: "Degree Colleges", icon: <Building2 size={20} />, count: 3, Page: "degreeColleges" },
    { name: "Primary Schools", icon: <School size={20} />, count: 6, Page: "primarySchools" },
    { name: "High Schools", icon: <BookOpen size={20} />, count: 5, Page: "highSchools" },
  ];

  return (
    <aside className="w-full h-full bg-slate-900  text-white flex flex-col">
      {/* Logo */}
      <div className=" bg-slate-900 p-6 border-b border-slate-800 ">
        <h1 className="text-xl font-bold">EduTrust Admin</h1>
        <p className="text-xs text-slate-400 mt-1">
          Central Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
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
  // 1. First, handle the background color in className
  className={({ isActive }) => 
    `flex justify-between items-center p-3 rounded-lg transition-all ${
      isActive ? "bg-white shadow-sm" : "hover:bg-slate-800 text-slate-400"
    }`
  }
>
  {/* 2. Use the function child pattern to access isActive for the content */}
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
      </nav>

      {/* Settings */}


      <NavLink to='/controllpanel'  className={({isActive})=>`flex justify-between items-center p-3 rounded-lg transition-all ${ isActive ? "bg-white shadow-sm" : "hover:bg-slate-800 text-slate-400"}`}>


Settings
      </NavLink>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;