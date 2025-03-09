import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home/Home'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App