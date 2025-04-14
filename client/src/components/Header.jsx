import '../css/header.css'
import Logo from '../assets/header-img/LOGO-for-DARK-background.png'
import SignoutIcon from '../assets/header-img/icon-signout.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import userImg from '../assets/profile-img/icon-user-for-profile.png';

const Header = () => {

  const [user, setUser] = useState({ name: '' });
  const { isLogged, setIsLogged } = useAppContext();
  const navigate = useNavigate(); 

  useEffect(() => {
      const userName = localStorage.getItem("name");
      if (userName) {
          setUser({ name: userName });
      } else {
        setUser({ name: 'Username' });
      }
      // console.log('Logged: ', isLogged);
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("name");    
    if (userName) {
      setUser({ name: userName });
    } else {
      setUser({ name: 'Username' });
    }
    // console.log('Logged: ', isLogged);
  }, [isLogged]);



  const handleSignOut = async () => {
      try {
          const result = await signOut();
          console.log(result.message);
          // Clear all client-side state    
          localStorage.clear();
          sessionStorage.clear();   
          setIsLogged(false);       
          setUser({ name: '' });
          navigate("/");
      } catch (error) {
          console.error("An error occurred while signing out:", error);
      }
  };

  return (
      <>
          <header>
              <div className="header-container">
                  {/* logo */}
                  <div className="header-logo-container">
                      <Link to="/">
                          <img
                              className="header-logo-img"
                              src={Logo}
                              alt="Theatre-App Logo"
                          />
                      </Link>
                  </div>
                  {/* Menu options */}
                  <nav className="menu-options-div">
                      <ul className="menu-ul">
                          <li className="menu-li">
                              <i className="fa fa-star"></i>
                              <Link to="/">What's on</Link>
                          </li>
                          {isLogged && (
                              <>
                                  (
                                  <li className="menu-li">
                                      <Link to="/tickets">
                                          My Tickets
                                      </Link>
                                  </li>
                                  <li className="menu-li">
                                      <Link to="/profile">
                                          Account
                                      </Link>
                                  </li>)
                              </>
                          )}
                      </ul>
                  </nav>
                  {/*   Sign out   */}
                  {isLogged && (
                      <>
                          <div className="signout-div" onClick={handleSignOut}>
                              <div className="header-user-info">
                                  Hello,
                                  <span className="header-user-name">
                                      {user.name}
                                  </span>
                              </div>
                              <img className="signout-logo" src={SignoutIcon} />
                          </div>
                      </>
                  )}
                  {!isLogged && (
                      <>
                          <div className="signout-div">
                              <Link to="/login" className="signout-text">
                                  Sign In
                              </Link>
                              <span className="signout-text" style={{marginRight: '3px', marginLeft: '3px'}}>/</span> 
                              <Link to="/register" className="signout-text" style={{marginRight: '10px'}}>
                                  Sign-up
                              </Link>
                              <img className="signout-logo" src={userImg} />
                          </div>
                      </>
                  )}
              </div>
              <div className="orange-line"></div>
          </header>
      </>
  );
}

export default Header

