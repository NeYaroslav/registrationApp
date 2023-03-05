import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './entryStyle.scss'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<>login</>}/>
      <Route path='/register' element={<>register</>}/>
      <Route path='/home' element={<>protected</>}/>
    </Routes>
  )
}

export default App
