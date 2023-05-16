import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"


const Signup = () => {

  return (
    <DocumentTitle title="Signup Form">
      <div className='page__container'>
        <h1 className='brand__name'>CarCoach</h1>
        <div className="signup__form">
          <h2 className='welcome__text'>Welcome</h2>
          <div className="input__container">
            <input type="text" placeholder="First name" required className='signin__input' />
            <input type="text" placeholder="Last name" required className='signin__input' />
            <input type="email" placeholder="Email" required className='signin__input'  />
            <input type="password" placeholder="Password" required className='signin__input' />
            <input type="password" placeholder="Confirm Password" required className='signin__input' />
            <button type='submit' className='signin__button'>Sign in</button>
          </div>
          {/* <div>
            
          </div> */}
          <h5 className='login__with'>or Signup with</h5>
          <hr className='horizontal__line' />
          <div className="icons__container">
            <span className='icon icon-1'><FaFacebook/></span>
            <span className='icon icon-2'><FaInstagram/></span>
            <span className='icon icon-3'><FaTwitter /></span>
          </div>
          <Link to="/signin" className='signup__content'>
            <h5 >Already have an account? signin</h5>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Signup