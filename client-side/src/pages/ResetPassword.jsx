import React, { useState } from 'react';
import axios from 'axios';
import "../styles/signin.css"
import { Link, useParams } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);

    const {token} = useParams();
    console.log(token)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords must match');
            // alert("passwords do not match");
            return;
          }
    
        try {
          
          const response = await axios.post('http://localhost:8080/api/password/reset', { token, password });
          
          setMessage(response.data);
          localStorage.setItem('token', response.data.token);
          window.location.href = '/';
        } catch (error) {
          setMessage(error.response.data);
        }
      };
      const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordError(null);
      };
    
  return (
    <DocumentTitle title="Reset Password">
    <div className='page__container'>
      <h1 className='brand__name'>CarCoach</h1>
      <div className="signup__form">
        <h2 className='welcome__text'>Reset Password</h2>
        <form className="input__container" onSubmit={handleSubmit}>
            <input type="password" placeholder="New Password" required className='signin__input' value={password} onChange={(event) => setPassword(event.target.value)} />
            <input type="password" placeholder="Confirm New Password" required className='signin__input'value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {message && <p className="error__message">{message}</p>}
            <button type='submit' className='signin__button'>Submit</button>
        </form>
        <hr className='horizontal__line' />
      </div>
    </div>
  </DocumentTitle>
  )
}

export default ResetPassword