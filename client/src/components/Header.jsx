import '../css/header.css'
import Logo from '../assets/header-img/LOGO-for-DARK-background.png'
import SignoutIcon from '../assets/header-img/icon-signout.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../services/authSignOut';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import userImg from '../assets/profile-img/icon-user-for-profile.png';

const Header = () => {

  const [user, setUser] = useState({ name: '' });
  const [role, setRole] = useState(0);
  const { isLogged, setIsLogged } = useAppContext();
  const navigate = useNavigate(); 

  useEffect(() => {
      const userName = localStorage.getItem("name");
      const role_stored = localStorage.getItem("role");      
      setRole(Number(role_stored));      
      if (userName) {
          setUser({ name: userName });
      } else {
        setUser({ name: 'Username' });
      }
      // console.log('Logged: ', isLogged);
    //   console.log('Role: ', role, ' Name: ', userName)
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("name");    
    const role_stored = localStorage.getItem("role");      
    setRole(Number(role_stored));      
    if (userName) {
      setUser({ name: userName });
    } else {
      setUser({ name: 'Username' });
    }
    // console.log('Logged: ', isLogged);
    // console.log('Role: ', role, ' Name: ', userName)
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

  const handleSignIn = async () => {    
        navigate("/login");    
  };

  return (
      <>
          <header>
              <div className="header-container container">
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
                              <Link to="/">
                                  <i className="fa fa-star"></i>
                                  What's on
                              </Link>
                          </li>
                          {/*  Menu options only for logged user  */}
                          {isLogged && role === 2 && (
                              <>                                  
                                  <li className="menu-li">
                                      <Link to="/tickets">My Tickets</Link>
                                  </li>
                                  <li className="menu-li">
                                      <Link to="/profile">Account</Link>
                                  </li>                                  
                              </>
                          )}
                          {/*  Menu options only for logged admins  */}
                          {isLogged && role === 1 && (
                              <>
                                  <li className="menu-li">
                                    <Link to="/superDashboard">Dashboard</Link>
                                  </li>
                                  <li className="menu-li">
                                    <Link to="/manageusers">Users</Link>
                                  </li>
                                  <li className="menu-li">
                                    <Link to="/manage-events">Events</Link>
                                  </li>
                                  <li className="menu-li">
                                    <Link to="/manage-tickets">Tickets</Link>
                                  </li>
                                  <li className="menu-li">
                                      <Link to="/profileSuper">Account</Link>
                                  </li>      
                              </>
                          )}
                      </ul>
                  </nav>
                  {/*   User logged info   */}
                  {isLogged && (
                      <>
                          <div className="signout-div">
                              <div className="header-user-info">
                                  Hello,
                                  <span className="header-user-name">
                                      {user.name}
                                  </span>
                              </div>
                              <img
                                  className="header-signout-img"
                                  src={SignoutIcon}
                                  onClick={handleSignOut}
                                  alt="Sign Out button"
                              />
                              <span className="tooltip">Sign out</span>
                          </div>
                      </>
                  )}
                  {/*  User not Logged - sign in/up  */}
                  {!isLogged && (
                      <>
                          <div className="signout-div">
                              <Link to="/login" className="signout-text">
                                  Sign In
                              </Link>
                              <span
                                  className="signout-text"
                                  style={{
                                      marginRight: "3px",
                                      marginLeft: "3px",
                                  }}
                              >
                                  /
                              </span>
                              <Link to="/register" className="signout-text">
                                  Sign-up
                              </Link>
                              {/* <Link to="/login" className="header-user-img">  */}
                                  <img className="header-signout-img" src={userImg} alt='User Avatar to Sign In' onClick={handleSignIn}/>
                                  <span className="tooltip tooltip-orange">Sign In</span>
                              {/* </Link> */}
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

