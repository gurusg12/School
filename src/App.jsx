import React from 'react'
import Entry from './Pages/Entry'
import { Routes  , Route } from 'react-router-dom'
import Main from './SubTrusts/PuC/Main'
import Paramedical from './SubTrusts/Paramedical/Paramedical'
import DegreeColleges from './SubTrusts/DegreeColleges/DegreeColleges'
import PrimarySchools from './SubTrusts/PrimarySchools/PrimarySchools'
import HighSchools from './SubTrusts/HighSchools/HighSchools'

const App = () => {
  return (

      <Routes>
        <Route path='/' element = {<Entry/>} />
        <Route path='/puc' element = {<Main/>} />
        <Route path='/paramedical' element = {<Paramedical/>} />
        <Route path='primarySchools' element = {<PrimarySchools/>} />
        <Route path='/degreeColleges' element = {<DegreeColleges/>} />
        <Route path='/highSchools' element = {<HighSchools/>} />
      </Routes>
  
  )
}

export default App
