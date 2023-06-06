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
import UploadTutorCar from "../pages/UploadTutorCar"
import JoinUs from "../pages/JoinUs"


const Routers = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Navigate to="/home" />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/cars' element={<CarListing/>} />
        <Route exact path='/cars/:slug' element={<CarDetails/>} />
        <Route exact path='/tutors' element={<TutorListing/>} />
        <Route exact path='/tutors/:name' element={<TutorDetails/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/earn-with-us' element={<UploadCar/>} />
        <Route exact path='/blogs' element={<Blog/>} />        
        <Route exact path='/blogs/:slug' element={<BlogDetails/>} />
        <Route exact path='/join-us' element={<JoinUs/>} />
        <Route exact path='/upload-car' element={<UploadTutorCar/>} />
        <Route exact path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default Routers