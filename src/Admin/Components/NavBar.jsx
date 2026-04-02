import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Settings, Menu, X, Rocket, School2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/admin', icon: <Home size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'StudenManagement', path: '/admin/studentmanagement', icon: <School2 size={20} /> },
    { name: 'Branches', path: '/admin/branchs', icon: <School2 size={20} /> },


  ];

  // Logic for the active link style
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Rocket />
            <span>ViteNav</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={navLinkClass}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;