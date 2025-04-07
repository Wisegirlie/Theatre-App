import './css/header.css';
import Logo from '../assets/header-img/LOGO-for-DARK-background.png';
import HomeIcon from '../assets/header-img/icon-home.png';
import SignoutIcon from '../assets/header-img/icon-signout.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth';
import { useEffect, useState } from 'react';

const HeaderSuperUser = () => {
  const [user, setUser] = useState({ name: '' });

  const navigate = useNavigate();

  useEffect(() => {
    
    const userName = localStorage.getItem('name');
    if (userName) {
      setUser({ name: userName });
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      console.log(result.message); 
      navigate('/login'); 
    } catch (error) {
      console.error('An error occurred while signing out:', error);
    }
  };

  return (
    <>
      <header>
        <div className="css-header">
          <div className='css-headerContent'>
            <div className='logo-header'>
              <img className="logo-header-img" src={Logo} alt="logo" />
            </div>
            <div className='css-icon-div'>
              <Link to="/superDashboard" className='no-underline'>
                <img className="css-icon" src={HomeIcon} alt="home-icon" />
              </Link>
            </div>
            <div className='css-text-div'>
              <Link to="/superDashboard" className='no-underline'>
                <p className='css-home-text'>Home</p>
              </Link>
              <Link to="/manageusers" className="no-underline"><p>Users</p></Link>
              <Link to="/manage-events" className="no-underline"><p>Events</p></Link>
              <Link to="/manage-tickets" className="no-underline"><p>Tickets</p></Link>
              <Link to="/profileSuper" className="no-underline"><p>Account</p></Link>
            </div>
          </div>
          <div className='css-signout-div' onClick={handleSignOut}>
            <p className='css-signout-text no-underline'>Sign Out</p>
            <img className='css-signout-logo' src={SignoutIcon} alt="signout-icon" />
          </div>
        </div>
        <div className='css-orange-line' />
        <div className='css-user-div'>
          <p className='css-user-logged'>{`User logged : ${user.name}`}</p>
        </div>
      </header>
    </>
  )
}

export default HeaderSuperUser;
