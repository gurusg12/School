import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Settings, School2 } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/admin', icon: <Home size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    { name: 'Students', path: '/admin/studentmanagement', icon: <School2 size={20} /> },
    { name: 'Branches', path: '/branch', icon: <School2 size={20} /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <>
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4">
        <div className="text-2xl font-bold text-blue-600 mb-6">ViteNav</div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
