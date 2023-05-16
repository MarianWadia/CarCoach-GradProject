import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"

const Signin = () => {
  return (
    <DocumentTitle title="Login Form">
      <div className='page__container'>
        <h1 className='brand__name'>CarCoach</h1>
        <div className="signup__form">
        <h2 className='welcome__text'>Welcome Back</h2>
          <div className="input__container">
            <input type="email" placeholder="Email" required className='signin__input'  />
            <input type="password" placeholder="Password" required className='signin__input' />
            <button type='submit' className='signin__button'>Sign in</button>
          </div>
          <h4 className='forget__password'>forget password?</h4>
          <h5 className='login__with'>or login with</h5>
          <hr className='horizontal__line' />
          <div className="icons__container">
            <span className='icon icon-1'><FaFacebook/></span>
            <span className='icon icon-2'><FaInstagram/></span>
            <span className='icon icon-3'><FaTwitter /></span>
          </div>
          <Link to="/signup" className='signup__content'>
            <h5 >don't have an account? signup</h5>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Signin