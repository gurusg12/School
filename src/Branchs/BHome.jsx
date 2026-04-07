import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  UserPlus,
  Wallet,
  LogIn,
  GraduationCap
} from 'lucide-react';

const BHome = () => {
  const location = useLocation();

  // ✅ FIX: Use consistent paths
  const navItems = [
    { path: '/branch', label: 'Dash', icon: <LayoutDashboard size={20} /> },
    { path: '/branch/paystd', label: 'Fees', icon: <Wallet size={20} /> },
    { path: '/branch/studentRegister', label: 'Register', icon: <UserPlus size={20} /> },
    { path: '/branch/logout', label: 'Logout', icon: <LogIn size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* 💻 Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm p-4">
        
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-600 mb-6">
          <GraduationCap />
          EduFlow
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition
                ${isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 📱 Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 p-4 bg-white border-b flex items-center gap-2 font-bold">
        <GraduationCap className="text-indigo-600" />
        EduFlow
      </header>

      {/* 📄 Main */}
      <main className="
        md:ml-64 
        p-4 md:p-6 
        pb-24 md:pb-6
      ">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 📱 Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <div className="bg-white border-t shadow-lg flex justify-around py-2">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive ? 'text-indigo-600' : 'text-slate-500'
                }`
              }
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          ))}

        </div>
      </div>

    </div>
  );
};

export default BHome;