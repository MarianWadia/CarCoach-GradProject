import React, { useState } from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import axios from 'axios';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    if (password !== confirmPassword) {
      setPasswordError('Passwords must match');
      // alert("passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', { firstName, lastName, email, password });
      localStorage.setItem('token', response.data.token);
      const id = response.data.id;
      window.location.href = `/home/${id}`;
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(null);
  };

  return (
    <DocumentTitle title="Signup Form">
      <div className='page__container'>
        <h1 className='brand__name'>CarCoach</h1>
        <div className="signup__form">
          <h2 className='welcome__text'>Welcome</h2>
            <form className="input__container" onSubmit={handleSubmit}>
              <input type="text" placeholder="First name" required className='signin__input' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type="text" placeholder="Last name" required className='signin__input' value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type="email" placeholder="Email" required className='signin__input' value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder="Password" required className='signin__input' value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="password" placeholder="Confirm Password" required className='signin__input'value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {passwordError && <p className="error__message">{passwordError}</p>}
              <button type='submit' className='signin__button'>Sign Up</button>
            </form>
          
          <h5 className='login__with'>or Signup with</h5>
          <hr className='horizontal__line' />
          {/* <div className="icons__container">
            <span className='icon icon-1'><FaFacebook/></span>
            <span className='icon icon-2'><FaInstagram/></span>
            <span className='icon icon-3'><FaTwitter /></span>
          </div> */}
          <Link to="/signin" className='signup__content'>
            <h5 >Already have an account? signin</h5>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Signup