import './css/login.css'
import UserIcon from '../assets/login-img/icon-user.png'
import LockIcon from '../assets/login-img/icon-lock.png'
import { useState } from 'react';
import { SignIn } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // if (data.user.role === 1) {
    //   navigate('/superDashboard'); 
    // } else if (data.user.role === 2) {
    //   navigate('/my-dashboard'); 
    // }

    try {
      console.log('attempting login with', email, password);
      const data = await SignIn(email, password);
      console.log('Login successfully:', data);
      setError('')
      if (data.user.role === 1) {
        navigate('/superDashboard');
      } else if (data.user.role === 2) {
        navigate('/my-dashboard');
      }
    } catch (error) {
      setError(error.message)
    }
    }

  return (
    <>
      <div className='wrapper'>
        <div className='css-content'>
          <div className='login-user-icon'>
            <img src={UserIcon} />
          </div>
          <p className='css-text-login'>Login below to get started</p>
          <form onSubmit={handleLogin}>
            <input 
              className='css-input' 
              type="text" 
              placeholder="&#128231; Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            >
            </input>
            <br></br>
            <input 
              className='css-input' 
              type="password" 
              placeholder="&#128274;  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <br></br>
            <button className="back-gray" type='submit'>Login</button>
            {error && <div className='message-div error-div'>{error}</div>}
            <br></br>
            
          </form>

          <div className='css-newUser-div'>
            <p><span className='css-text-user'>New user?</span>
            <Link to="/register" className='no-underline'>
              <span className='css-text-register no-underline'>Register</span>
            </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
