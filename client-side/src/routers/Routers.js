import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Blog from "../pages/Blog"
import BlogDetails from "../pages/BlogDetails"
import CarDetails from "../pages/CarDetails"
import CarListing from "../pages/CarListing"
import TutorListing from "../pages/TutorListing"
import TutorDetails from "../pages/TutorDetails"
import NotFound from "../pages/NotFound"
import Contact from "../pages/Contact"
import UploadCar from "../pages/UploadCar"
import JoinUs from "../pages/JoinUs"


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cars' element={<CarListing/>} />
        <Route path='/cars/:slug' element={<CarDetails/>} />
        <Route path='/tutors' element={<TutorListing/>} />
        <Route path='/tutors/:slug' element={<TutorDetails/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/earn-with-us' element={<UploadCar/>} />
        <Route path='/blogs' element={<Blog/>} />        
        <Route path='/blogs/:slug' element={<BlogDetails/>} />
        <Route path='/join-us' element={<JoinUs/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default Routers