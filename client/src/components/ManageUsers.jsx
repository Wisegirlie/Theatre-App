import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashBar from '../assets/dashboard-img/asset-dash-rounded.png';
import UserIcon from '../assets/login-img/icon-user.png';
import './css/manageUsers.css';
import { deleteUser, getAllUsers } from '../services/userServices';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleModifyUser = (id) => {
    navigate(`/modify-User/${id}`, { state: { users } });
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError(error.message);
    }
  };
  
  return (
    <>
      <div className='css-main-div css-align-baseline css-dashboard-info'>
        <div>
          <div className='css-dashboard-div'>
            <h1 className='css-color-darkOrange css-margin-none'>Manage Users</h1>                        
            <img src={DashBar} className='dashbar-rounded dashbar-manageUsers' />
            <br />
            <br />
          </div>
          <div>
            <Link to="/add-User">
              <button className='button-add'>Add new user</button>
            </Link>
            <br></br>
            <Link to="/superDashboard">
              <button className='css-return-dashboard'>return to dashboard</button>
            </Link>
          </div>
          <div>
            <h4>Users registered: {users.length}</h4>
          </div>
        </div> 
        <div className='css-user-main-container'>  
          {users.map((user, index) => (
            <div key={index}>                                     
              <div className='css-user-container'>
                <div className='css-user-icon'>
                  <img src={UserIcon} alt="User Icon" />
                </div>
                <div className='css-user-info'>
                  <div className='css-user-details'>
                    <h4>{user.name}</h4>
                    <h4>{user.email}</h4>
                    <h4>Role: 
                      <span className={user.role === 1 ? 'text-orange' : '' }>
                        {user.role === 1 ? " System Administrator" : " Regular User"}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className='css-user-buttons'>
                  <button className='button-modify button-manageUsers' onClick={() => handleModifyUser(user._id)}>Modify</button>
                  <button className='button-delete button-manageUsers' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </div>
              </div>
            </div>                    
          ))}  
        </div>              
      </div>
    </>
  );
}

export default ManageUsers;
