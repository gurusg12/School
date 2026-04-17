import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const Btn = [
    { name: "BranchsReg", path: "/branchsRegister", styles: "text-slate-900 border p-2" },
    { name: "Branch-login", path: "/branch/blogin", styles: "text-red-400" }
  ]

  return (
    <div className='h-15 w-full bg-lime-500 flex justify-around items-center'>
      {Btn.map((e, i) => {
        return (
          <NavLink
            key={i}
            to={`${e.path}`}  
            className={e.styles}
          >
            {e.name}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavBar