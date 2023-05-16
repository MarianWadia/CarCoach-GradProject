import React from 'react'
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import {Routes, Route} from "react-router-dom"

const SpecialRoutes = () => {
  return (
    <Routes>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default SpecialRoutes