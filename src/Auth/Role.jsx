import React from 'react'
import { useNavigate } from 'react-router-dom'

const Role = ({roles , children}) => {
    const role = JSON.parse("roles")
    const navigate  = useNavigate()
if(!role){
    navigate('/')
    return
}
    if(roles === roles){
        navigate(`/${role}`)
    }
  return (
    {children}
  )
}

export default Role