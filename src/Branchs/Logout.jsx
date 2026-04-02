import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(()=>{
localStorage.removeItem("loggedBranch")
navigate('/branch')
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Logout
