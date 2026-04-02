import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  UserPlus, 
  Wallet, 
  LogIn, 
  GraduationCap 
} from 'lucide-react';

const BHome = () => {
  const navItems = [
    { path: 'blogin', label: 'Login', icon: <LogIn size={20} /> },
    { path: 'bdash', label: 'Dash', icon: <LayoutDashboard size={20} /> },
    { path: 'paystd', label: 'Fees', icon: <Wallet size={20} /> },
    { path: 'studentRegister', label: 'Register', icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100">
      {/* Desktop Top Navbar */}
      <nav className="hidden md:block sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-indigo-600 text-xl tracking-tight">
            <GraduationCap className="text-indigo-500" strokeWidth={2.5} />
            <span>EduFlow</span>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.icon}
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-indigo-50 rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden p-5 bg-white border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <GraduationCap size={24} className="text-indigo-600" />
          <span>EduFlow</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 pb-24 md:pb-8">
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

      {/* Mobile Bottom Navigation (Modern Floating Dock) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[100]">
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] p-2 shadow-2xl border border-white/10 flex justify-between items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center w-16 h-12 rounded-2xl transition-all
                ${isActive ? 'text-white' : 'text-slate-400'}
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div 
                    whileTap={{ scale: 0.8 }} 
                    className="relative z-10"
                  >
                    {item.icon}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActive"
                      className="absolute inset-0 bg-indigo-600 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="text-[10px] mt-1 font-medium z-10">{item.label}</span>
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