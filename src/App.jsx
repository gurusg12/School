import React from 'react'
import Entry from './Pages/Entry'
import { Routes, Route } from 'react-router-dom'
import Paramedical from './SubTrusts/Paramedical/Paramedical'
import DegreeColleges from './SubTrusts/DegreeColleges/DegreeColleges'
import PrimarySchools from './SubTrusts/PrimarySchools/PrimarySchools'
import HighSchools from './SubTrusts/HighSchools/HighSchools'
import Puc from './SubTrusts/Puc/Puc'
import Navbar from './Pages/NavBar'
import ControllPanel from './Pages/ControllPanel'
import AdmissionForm from './Pages/AdmissionForm'
import StudentPortal from './Pages/StudentPortal'
import Register from './Pages/Register'
import Role from './Auth/Role'

import Login from './Admin/Login'
import StudentManagement from './Admin/Pages/StudentManagement'
// import Dashboard from './Admin/DashBoard'
import Registration from './Admin/Pages/Registration'
import Admin from './Admin/Admin'
import AdminDashboard from './Admin/Pages/AdminDashboard'
import Fee from './Admin/Pages/Fee'
import Reports from './Admin/Pages/Reports'
import Branchs from './Admin/Pages/Branchs'
import Add from './Branchs/Add'
import BLogin from './Branchs/BLogin'
import Registerstd from './Branchs/Registerstd'
import BDash from './Branchs/BDash'
import Pay from './Branchs/Pay'
import BHome from './Branchs/BHome'
import Logout from './Branchs/Logout'

const App = () => {
  return (
    <div>
      {/* <div className='flex flex-col md:flex-row h-screen w-screen bg-slate-100 overflow-hidden'>
      <main className='flex-1 h-full overflow-y-auto p-4 md:p-8'>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/trusts' element = {<Trust/>} />
          <Route path='/degree' element = {<Role roles={"degree"}>
            <DegreeColleges/>
          </Role>}/>
          <Route path='/controllpanel' element={<ControllPanel />} />
          <Route path='/puc' element={<Puc />} />
          <Route path='/admission' element={<AdmissionForm />} />
          <Route path='/studentportal' element={<StudentPortal />} />
          <Route path='/paramedical' element={<Paramedical />} />
          <Route path='/primarySchools' element={<PrimarySchools />} />
          <Route path='/degreeColleges' element={<DegreeColleges />} />
          {/* {/* <Route path='/highSchools' element={<HighSchools />} /> */}
      {/* </Routes> 
      </main>
      <div>
      </div> */}
      {/* </div> */}






      <Routes>
        <Route path='/' element={<Login />} />  
        <Route path='/branchsRegister' element = {<Add/>}/>   
        <Route path='/branch' element = {<BHome/>}>
          <Route   index  element  = {<BDash/>}/>
          <Route path='blogin' element  = {<BLogin/>}/>
          <Route path='paystd' element  = {<Pay/>}/>
          <Route path='logout' element  = {<Logout/>}/>
          <Route path='studentRegister' element = {<Registerstd/>}/>
        </Route>
        <Route path='/admin' element={<Admin />}>
        <Route  index element = {<AdminDashboard/>}/>
        <Route  path='branchs' element = {<Branchs/>}/>
        <Route path='studentmanagement' element={<StudentManagement />}>
            <Route  path='registration' element={<Registration/>}/>
            <Route  path='feemanagement' element={<Fee/>}/>
            <Route  index element={<Reports/>}/>
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App