import React from 'react'
import Routers from "../../routers/Routers"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SpecialRoutes from '../../routers/SpecialRoutes'

const Layout = () => {
  // checks for a route that starts with /reset/ followed by one or more characters
  const resetRoutePattern = /^\/reset\/.+$/;
  if (window.location.pathname === "/signin" || 
      window.location.pathname === "/signup" || 
      window.location.pathname === "/forgot" || 
      resetRoutePattern.test(window.location.pathname)
      ){
    return(
      <>
        <div>
          <SpecialRoutes />
        </div>
      </>
      
    )
  }else{
    return (
      <>
        <Header />
        <div>
            <Routers />
        </div>
        <Footer />
      </>
      )
  }
}

export default Layout