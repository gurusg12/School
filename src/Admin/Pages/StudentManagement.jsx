import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserPlus, Receipt, GraduationCap, Settings, Wallet } from 'lucide-react';

const StudentManagement = () => {
  const links = [
    { to: "registration", label: "Register", icon: <UserPlus size={22} /> },
    { to: "feemanagement", label: "Pay Fee", icon: <Wallet size={22} /> },
    { to: "receipts", label: "History", icon: <Receipt size={22} /> },
    { to:"/admin/studentmanagement" , label: "Student-Reports", icon: <Receipt size={22} /> },

    { to: "settings", label: "Settings", icon: <Settings size={22} /> },
  ];

  // Universal Styling for Active State
  const getLinkStyles = ({ isActive }) => 
    `flex flex-col items-center justify-center gap-1 relative px-5 py-1 transition-all duration-300 group ${
      isActive 
        ? 'text-blue-600 scale-105' 
        : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- TOP BRANDING BAR --- */}
      <header className=" bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex gap-3 px-6 py-4 items-center">
           <div className="bg-blue-600 p-1.5 rounded-lg text-white">
             <GraduationCap size={24} />
           </div>
           <span className="font-bold text-gray-800 text-xl tracking-tight">Student<span className="text-blue-600">Portal</span></span>
        </div>
      </header>

      {/* --- UNIVERSAL FLOATING BOTTOM NAV --- */}
      <nav className="fixed bottom-0 w-full left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
        <div className="flex w-fit bg-white/90 backdrop-blur-xl p-2 border border-gray-200 shadow-2xl rounded-2xl pointer-events-auto">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkStyles}>
              {({ isActive }) => (
                <>
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -top-1 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  )}
                  
                  <div className={`${isActive ? 'animate-pulse' : ''}`}>
                    {link.icon}
                  </div>
                  
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentManagement;