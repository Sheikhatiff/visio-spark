import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CosmicLogin from '../pages/loginpage'
import CosmicSignup from '../pages/SignupPage'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CosmicLogin />} />
       <Route path="/login" element={<CosmicLogin />} />
      <Route path="/signup" element={<CosmicSignup />} />
    </Routes>
  )
}

export default App