import React from 'react'
import Routers from "../../routers/Routers"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SpecialRoutes from '../../routers/SpecialRoutes'

const Layout = () => {
  if (window.location.pathname === "/signin" || window.location.pathname === "/signup"){
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