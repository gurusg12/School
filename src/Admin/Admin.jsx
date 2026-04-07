import React from 'react'
import NavBar from './Components/NavBar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Sidebar / Bottom Nav */}
      <NavBar />

      {/* Main Content */}
      <main className="
        md:ml-64 
        px-4 py-4 
        pb-20 md:pb-6
      ">
        <Outlet />
      </main>

    </div>
  )
}

export default Admin