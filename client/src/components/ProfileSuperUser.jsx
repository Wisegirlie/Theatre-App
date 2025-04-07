import iconUser from '../assets/profile-img/icon-user-for-profile.png'
import './css/profileUser.css'
import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'


// functionality for the return button
const handleReturn = () => {
  window.history.back(); 
};

const ProfileSuperUser = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect (() => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');

    if (userName && userEmail) {
      setUser({ name: userName, email: userEmail });
    }
    
  },[])

    return (
      <>
        <div className='css-flex css-flex-align' id='div-main'>
          <div className='profile-title-div'>
            <h1 className='page-main-title'>Super User Profile</h1>      
            <img className='css-dashbarRounded' src={DashBarRounded} alt="Dash Rounded" /> 
            <br></br>
          <br></br>
          <Link to="/superDashboard">
            <button className='css-return-dashboard'>return to dashboard</button>
          </Link>
          </div>  
          <div className='profile-card'>
              <div id='div-left'className='css-dashboard-div'>                      
                <img src={iconUser} alt="User icon" className='profile-user-icon'/>
              </div>
              <div id='div-right' className='css-padding-top-30'>
                <h3>
                  <span className='css-color-darkGrey css-margin-right-10'>
                    User Name:
                  </span>
                  <span className='css-font-bold css-font-size-bigger'>
                    {user.name} 
                  </span>
                </h3>
                <h3>
                  <span className='css-color-darkGrey css-margin-right-10'>
                    E-mail:
                  </span>
                  <span className='css-font-bold css-font-size-bigger'>
                    {user.email}
                  </span>
                </h3>
                <h3 className='css-color-darkGrey gray-text-medium-size'>
                    Role: System Administrator 
                </h3>
                <button onClick={handleReturn} className='button-back'>Return</button>
              </div>
            </div>
        </div>
      </>
    )
  }
  
  export default ProfileSuperUser 