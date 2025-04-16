import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DashBarRounded from '../assets/dashboard/assets-dash-rounded.png';
import defaultPic from '../assets/profile/icon-user-for-profile.png';
import { ModifyingUser } from '../services/userServices';

const handleReturn = () => {
  window.history.back(); 
};

const ModifyUser = () => {
  const location = useLocation();
  const { users } = location.state || { users: [] }; // Recibe los usuarios de la ubicación
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('••••••••'); // Valor ficticio para la entrada de contraseña

  useEffect(() => {
    if (Array.isArray(users)) {
      const userToModify = users.find(user => user._id === id);
      if (userToModify) {
        setName(userToModify.name);
        setEmail(userToModify.email);
        setRole(userToModify.role);
      }
    }
  }, [id, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 1 && role !== 2) {
      setError('Invalid role value. Please choose between 1 or 2.');
      return;
    }
    try {
      console.log(`attempting modifying user with ${id}, ${name}, ${email}, ${password}, ${role}`)
      const updatedUser = await ModifyingUser(id, name, email, password, role);
      console.log(`user update successfully: ${updatedUser}`);
      const updatedUsers = users.map(user => (user._id === id ? updatedUser : user));
      
      setSuccess("User Successfully updated");
      setError('');
      navigate('/manageusers', { state: { users: updatedUsers } });
    } catch (error) {
      console.log('Update failed');
      setError(error.message);
      setSuccess('');
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordInputValue(e.target.value);
    setPassword(e.target.value);
  }

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='css-color-darkOrange css-margin-none'>Modify User</h1>
          <img className='css-dashbarRounded' src={DashBarRounded} alt="Dash Rounded" />
        </div>
        <div className='css-flex'>
          <div>
            <img src={defaultPic} alt="Profile" />
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
                <input 
                  className='css-input-insert' 
                  type='password' 
                  value={passwordInputValue} 
                  onChange={handlePasswordChange} 
                  disabled
                />
                <br></br>
              </div>
              <span className='css-black-bold'>Role:</span>
              <input className='css-input-insert css-tickets-width' type='number' min={1}
                max={2} value={role} onChange={(e) => setRole(e.target.valueAsNumber)} />
              <br></br>              
              <button className='button-modify' onClick={handleSubmit} style={{ marginRight: '40px' }}>
                Modify User
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
              {error && <p style={{ color: 'red', fontSize: 15 }}>{error}</p>}
              {success && <span style={{ color: 'green', fontSize: 20 }}>{success}</span>}
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default ModifyUser;
