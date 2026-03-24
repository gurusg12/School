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

const App = () => {
  return (
    // 1. We use 'relative' and 'flex-col md:flex-row' to handle mobile stacking
    <div className='flex flex-col md:flex-row h-screen w-screen bg-slate-100 overflow-hidden'>
      
      {/* 2. Remove the fixed w-[20%] wrapper. The Navbar now manages its own responsive width */}
      <Navbar />

      {/* 3. This div holds your page content. 'flex-1' makes it take the remaining space. */}
      <main className='flex-1 h-full overflow-y-auto p-4 md:p-8'>
        <Routes>
          <Route path='/' element={<Entry />} />
          <Route path='/controllpanel' element={<ControllPanel />} />
          <Route path='/puc' element={<Puc />} />
          <Route path='/admission' element={<AdmissionForm />} />
          <Route path='/studentportal' element={<StudentPortal />} />
          <Route path='/paramedical' element={<Paramedical />} />
          <Route path='/primarySchools' element={<PrimarySchools />} />
          <Route path='/degreeColleges' element={<DegreeColleges />} />
          <Route path='/highSchools' element={<HighSchools />} />
        </Routes>
      </main>
    </div>
  )
}

export default App