import { useState } from 'react';
import { AddingUser } from '../../services/userServices'
import { useNavigate } from 'react-router-dom';
import "../../css/admin/userModify.css";
import { ROLES } from "../../constants/roles.js";

const AddUser = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES.USER); // Default role set to USER
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/manage-users'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  Validate inputs
    if (!name || !email || !password || !role) {
      // console.log(name, email, password, role);
      setError('All fields are required. Please fill in all fields.');      
      return;
    }
    if (name.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      return;
    }    
    
    if (Number(role) !== ROLES.USER && Number(role) !== ROLES.ADMIN) {
      setError('Invalid role selected. Please select a valid role.');
      return;
    }    
    try {
      // console.log(`attempting creating user with ${name}, ${email}, ${password}, ${role}`)
      const data = await AddingUser(name, email, password, Number(role))
      console.log(`user create successfully: ${data}`);
      setName('');
      setPassword('');
      setEmail('');
      setRole('');
      setSuccess("user Successfully created")
      setError('')
      navigate('/manage-users');
    } catch (error) {
      console.log('Create User failed');
      setError(error.message);
      setSuccess('')
    }
  }

  return (
    <div className="userModify-background">
                <div className="userModify-form-container">

                    <div className="userModify-form-header">
                        <h1 className="page-main-title">
                            Add User
                        </h1>                    
                    </div>
                    
                    <div className="userModify-form-content">                    
                        {/* User icon */}
                        <div className="profile-user-img-container userModify-user-avatar-space">
                            <span className="fa fa-user-o"></span>
                        </div>   
                        
                        <form className='userModify-form' >
                          <div className="userModify-form-fields">
                              <div className="userModify-form-group">
                                  <label htmlFor="username" className="userModify-form-label">Username</label>
                                  <input
                                      id="username"
                                      name="username"
                                      className="userModify-form-input"
                                      type="text"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      autoComplete='username'
                                  />
                              </div>
                              
                              <div className="userModify-form-group">
                                  <label htmlFor="email" className="userModify-form-label">Email</label>
                                  <input
                                      id="email"
                                      name="email"
                                      className="userModify-form-input"
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      autoComplete='email'
                                  />
                              </div>
                              
                              <div className="userModify-form-group">
                                  <label htmlFor="password" className="userModify-form-label">Password</label>
                                  <input
                                      id="password"
                                      name="password"                                
                                      className="userModify-form-input"
                                      type="password"
                                      placeholder="Enter new password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} 
                                      autoComplete='new-password'
                                  />         
                                  <small className="text-muted">Minimun 6 characters</small>                         
                              </div>
                              
                              <div className="userModify-form-group">
                                  <label htmlFor="role" className="userModify-form-label">Role</label>
                                  <select
                                      id="role"
                                      name="role"   
                                      type='number'                                   
                                      className="userModify-form-select"
                                      value={role} 
                                      onChange={(e) => setRole(Number(e.target.value))}
                                   >
                                      <option value={ROLES.USER}>Regular user</option>
                                      <option value={ROLES.ADMIN}>Administrator</option>
                                  </select>
                              </div>
                              
                              <div className="userModify-button-group">
                                  <button
                                      className="button-modify"
                                      onClick={handleSubmit}
                                  >
                                      Add User
                                  </button>
                                  <button
                                      onClick={handleReturn}
                                      className="button-modify userModify-button-secondary"
                                  >
                                      Return
                                  </button>
                              </div>
                              
                              {error && (
                                  <div className="userModify-status-message userModify-error-message">
                                      {error}
                                  </div>
                              )}
                              {success && (
                                  <div className="userModify-status-message userModify-success-message">
                                      {success}
                                  </div>
                              )}
                              
                          </div>
                        </form>
                    </div>
                </div>            
            </div>
  )
}

export default AddUser