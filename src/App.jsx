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
import Login from './Pages/Login'
import Register from './Pages/Register'
import Role from './Auth/Role'

const App = () => {
  return (
    // 1. We use 'relative' and 'flex-col md:flex-row' to handle mobile stacking
    <div className='flex flex-col md:flex-row h-screen w-screen bg-slate-100 overflow-hidden'>
      <Navbar />
      <main className='flex-1 h-full overflow-y-auto p-4 md:p-8'>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/degree' element = {<Role roles={"degree"}>
            <DegreeColleges/>
          </Role>}/>
          <Route path='/controllpanel' element={<ControllPanel />} />
          <Route path='/puc' element={<Puc />} />
          <Route path='/admission' element={<AdmissionForm />} />
          <Route path='/studentportal' element={<StudentPortal />} />
          <Route path='/paramedical' element={<Paramedical />} />
          <Route path='/primarySchools' element={<PrimarySchools />} />
          {/* <Route path='/degreeColleges' element={<DegreeColleges />} /> */}
          <Route path='/highSchools' element={<HighSchools />} />
        </Routes>
      </main>
    </div>
  )
}

export default App