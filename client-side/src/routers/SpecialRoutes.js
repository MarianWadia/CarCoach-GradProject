import React from 'react'
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import {Routes, Route} from "react-router-dom"
import ResetPassword from "../pages/ResetPassword"
import ForgotPassword from "../pages/ForgotPassword"

const SpecialRoutes = () => {
  return (
    <Routes>
        <Route exact path='/signin' element={<Signin/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/forgot' element={<ForgotPassword/>} />
        <Route exact path='/reset/:token' element={<ResetPassword/>} />
    </Routes>
  )
}

export default SpecialRoutes