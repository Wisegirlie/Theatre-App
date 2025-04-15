import { useState } from 'react';
import '../css/login.css'
import { SignIn, Register } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';



const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAppContext();
  

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // console.log(`attempting creating user with ${username}, ${email}, ${password}`)
      const data = await Register(username, email, password)
      // console.log(`user registered successfully: ${data}`);
      console.log(`user registered successfully.`);
      setUsername('');
      setPassword('');
      setEmail('');
      setSuccess("Thank you!")
      setError('')       
      try {
        const data = await SignIn(email, password);            
        console.log('Login successfully');            
        setIsLogged(true);
        if (data.user.role === 1) {
          setTimeout(() => {        
            navigate('/superDashboard');
          }, 1450);          
        } else if (data.user.role === 2) {
          setTimeout(() => {        
            navigate('/');
          }, 1450);   
        }
      } catch (error) {
        setError(error.message)
      }
      


    } catch (error) {
      console.log('Register failed');
      setError(error.message);
      setSuccess('')
    }
  };

  return (
      <div className="login-container">
          <div className="login-container-background"></div>
          <div className="login-content-container">
              <div className="login-content-container-inner-border">
                  <h1 className="signup-title">Sign up</h1>
                  <p className="login-form-text">Create your account</p>
                  <form onSubmit={handleSignUp}>
                      <input
                          className="login-form-input"
                          type="text"
                          placeholder="Full Name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      ></input>
                      <input
                          className="login-form-input"
                          type="text"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      ></input>
                      <input
                          className="login-form-input css-margin-bottom-30px"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      ></input>
                      <button type="submit" className="login-form-button">
                          Register
                      </button>
                      {error && (
                          <div className="login-error-container login-error-color">
                              {error}
                          </div>
                      )}
                      {success && (
                          <div className="login-error-container login-success-color">
                              {success}
                          </div>
                      )}
                  </form>

                  <div className="login-bottom-text-container">
                      <p>
                          <span className="login-bottom-text">
                              Already registered?
                          </span>
                          <Link to="/login">
                              <span className="login-bottom-link">
                                  Login instead
                              </span>
                          </Link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default SignUp