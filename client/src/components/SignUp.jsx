import { useState } from 'react';
import './css/login.css'
import { Register } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log(`attempting creating user with ${username}, ${email}, ${password}`)
      const data = await Register(username, email, password)
      console.log(`user registered successfully: ${data}`);
      setUsername('');
      setPassword('');
      setEmail('');
      setSuccess("user registered created")
      setError('')

      setTimeout(() => {
        navigate('/login');
      }, 1350);


    } catch (error) {
      console.log('register failed');
      setError(error.message);
      setSuccess('')
    }
  };

  return (
    <>
      <div className='wrapper'>
        <div className='css-content'>
          <h1 className='css-color-darkOrange css-margin-bottom-30px'>Sign up</h1>
          <form onSubmit={handleSignUp}>
            <input 
              className='css-input' 
              type="text" 
              placeholder="&#128100;  User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required>
            </input>
            <input 
              className='css-input' 
              type="text" 
              placeholder="&#128231;  Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required>
            </input>
            <br></br>
            <input 
              className='css-input css-margin-bottom-30px' 
              type="password" 
              placeholder="&#128274;  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required>

              </input>
            <br></br>
            <button type='submit'>Register</button>
            {error && <div className='message-div error-div'>{error}</div>}
            {success && <div className='message-div success-div'>{success}</div>}
          </form>
          
          <div className='css-newUser-div'>
            <p><span className='css-text-user'>Already registered?</span>
            <Link to="/login" className='no-underline'>
              <span className='css-text-register'>Login instead</span>
            </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp