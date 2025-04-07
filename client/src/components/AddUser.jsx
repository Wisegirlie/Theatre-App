import { useState } from 'react';
import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import defaultPic from '../assets/profile-img/icon-user-for-profile.png'
import { AddingUser } from '../services/userServices'
import { useNavigate } from 'react-router-dom';

const handleReturn = () => {
  window.history.back(); 
};

const AddUser = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 1 && role !== 2) {
      setError('Invalid role value. Please choose between 1 or 2.');
      return;}
    try {
      console.log(`attempting creating user with ${name}, ${email}, ${password}, ${role}`)
      const data = await AddingUser(name, email, password, role)
      console.log(`user create successfully: ${data}`);
      setName('');
      setPassword('');
      setEmail('');
      setRole('');
      setSuccess("user Successfully created")
      setError('')
      navigate('/manageusers');
    } catch (error) {
      console.log('create failed');
      setError(error.message);
      setSuccess('')
    }
  }

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='css-color-darkOrange css-margin-none'>Add User</h1>
          <img className='css-dashbarRounded' src={DashBarRounded} />
        </div>
        <div className='css-flex'>
          <div>
            <img src={defaultPic} />
          </div>
          <div className='css-margin-left-40px'>
            <div className='css-margin-bottom-30px'>
              <span className='css-black-bold'>Username:</span>
              <input className='css-input-insert' type='text' value={name} onChange={(e) => setName(e.target.value)} />
              <br></br>
            </div>
            <div className='css-margin-bottom-30px'>
              <span className='css-black-bold'>Email:</span>
              <input className='css-input-insert' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
              <br></br>
              <div className='css-margin-bottom-30px'>
              </div>
              <div className='css-margin-bottom-30px'>
                <span className='css-black-bold'>Password:</span>
                <input className='css-input-insert' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br>
              </div>
              <span className='css-black-bold'>Role:</span>
              <input className='css-input-insert css-tickets-width' type='number' min={1}
                max={2} value={role} onChange={(e) => setRole(e.target.valueAsNumber)} />
              <br></br>
              <button className='button-add' onClick={handleSubmit} style={{ marginRight: '40px' }}>
                Add User
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
              {error && <p style={{ color: 'red', fontSize: 15 }}>{error}</p>}
              {success && <p style={{ color: 'green', fontSize: 20 }}>{success}</p>}
            </div>
            
              
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default AddUser