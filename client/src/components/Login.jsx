import '../css/login.css'
import '../css/buttons.css'
import { useState } from 'react';
import { SignIn } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAppContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    // if (data.user.role === 1) {
    //   navigate('/superDashboard'); 
    // } else if (data.user.role === 2) {
    //   navigate('/my-dashboard'); 
    // }

    try {
      // console.log('attempting login with', email, password);
      const data = await SignIn(email, password);
      // console.log('Login successfully:', data);
      console.log('Login successfully');
      setError('')
      setIsLogged(true);
      if (data.user.role === 1) {
        navigate('/superDashboard');        
      } else if (data.user.role === 2) {
        navigate('/');
      }
    } catch (error) {
      setError(error.message)
    }
    }

  return (
      <div className="login-container">
          <div className="login-container-background"></div>
          <div className="login-content-container">
            <div className="login-content-container-inner-border">
              <div className="login-user-img-container">
                  {/* <img src={UserIcon} /> */}
                  <span className='fa fa-user-o'></span>
              </div>
              <p className="login-form-text">
                Log in into your account
              </p>
              <form onSubmit={handleLogin}>
                  <input
                      className="login-form-input"
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  ></input>
                  <input
                      className="login-form-input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  ></input>
                  <button className="login-form-button" type="submit">
                      Login
                  </button>
                  {error && (
                      <div className="login-error-container login-error-color">
                          {error}
                      </div>
                  )}
              </form>

              <div className="login-bottom-text-container">
                  <p>
                      <span className="login-bottom-text">
                        New user?
                      </span>
                      <Link to="/register">
                          <span className="login-bottom-link">
                            Register
                          </span>
                      </Link>
                  </p>
              </div>
              </div>  
          </div>
      </div>
  );
}

export default Login;
