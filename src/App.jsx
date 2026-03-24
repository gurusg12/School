import React from 'react'
import Entry from './Pages/Entry'
import { Routes  , Route } from 'react-router-dom'
import Paramedical from './SubTrusts/Paramedical/Paramedical'
import DegreeColleges from './SubTrusts/DegreeColleges/DegreeColleges'
import PrimarySchools from './SubTrusts/PrimarySchools/PrimarySchools'
import HighSchools from './SubTrusts/HighSchools/HighSchools'
import Puc from './SubTrusts/Puc/Puc'
import Navbar from './Pages/NavBar'
import ControllPanel from './Pages/ControllPanel'

const App = () => {



  return (


       <div className='flex  h-screen w-screen bg-slate-100'>
        <div className='w-[20%]'><Navbar/></div>
         <Routes>
        <Route path='/' element = {<Entry/>} />
        <Route path='/controllpanel' element = {<ControllPanel/>} />
        <Route path='/puc' element = {<Puc/>} />
        <Route path='/paramedical' element = {<Paramedical/>} />
        <Route path='primarySchools' element = {<PrimarySchools/>} />
        <Route path='/degreeColleges' element = {<DegreeColleges/>} />
        <Route path='/highSchools' element = {<HighSchools/>} />
      </Routes>
       </div>
  
  )
}

export default App
