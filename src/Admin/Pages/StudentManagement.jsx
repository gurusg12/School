import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const StudentManagement = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <NavBar />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentManagement