import React from 'react'
import NavBar from './Components/NavBar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <Outlet/>
    </div>
  )
}

export default Admin