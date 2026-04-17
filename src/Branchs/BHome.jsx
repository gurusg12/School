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

  const navItems = [
    { path: 'logout', label: 'LogOut', icon: <LogIn size={20} /> },
    { path: '/branch', label: 'Dash', icon: <LayoutDashboard size={20} /> },
    { path: 'paystd', label: 'Fees', icon: <Wallet size={20} /> },
    { path: 'studentRegister', label: 'Register', icon: <UserPlus size={20} /> },
    { path: 'admit', label: 'Admission', icon: <UserPlus size={20} /> },
    { path: '/', label: 'Admin-login', icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="min-h-screen  bg-[rgb(221,203,152)] text-slate-900 flex">

      {/* 🔥 Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 ">
        
        {/* Logo */}
        <div className="flex items-center  gap-2 font-bold text-indigo-600 text-xl mb-6">
          <GraduationCap className="text-indigo-500" strokeWidth={2.5} />
          <span>EduFlow</span>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'text-indigo-600' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
              `}
            >
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="absolute inset-0 bg-[#e4b00611] rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* 🔥 Main Section */}
      <div className="flex-1 flex flex-col  ">

        {/* Mobile Header */}
        <header className="md:hidden p-1 bg-[#3ae011a6] border-b border-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <GraduationCap size={24} className="text-indigo-600" />
            <span>EduFlow</span>
          </div>
        </header>

        {/* Content */}
        <main className="  w-full ">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 🔥 Mobile Bottom Nav (UNCHANGED) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-screen">
        <div className="bg-[#011a1b] backdrop-blur-2xl w-full py-2 shadow-2xl border border-white/10 flex justify-between items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center w-full h-12 rounded-2xl transition-all
                ${isActive ? 'text-white' : 'text-slate-400'}
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div whileTap={{ scale: 0.8 }} className="relative z-10">
                    {item.icon}
                  </motion.div>

                  {isActive && (
                    <motion.div
                      layoutId="mobileActive"
                      className="absolute inset-0 bg-[#1af7648a]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  <span className="text-[8px]  font-medium z-10">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BHome;