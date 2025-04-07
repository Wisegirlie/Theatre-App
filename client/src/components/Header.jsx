import './css/header.css'
import Logo from '../assets/header-img/LOGO-for-DARK-background.png'
import HomeIcon from '../assets/header-img/icon-home.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header>
        <div className="css-header">
          <div className='css-headerContent'>
            <div className='logo-header'>
              <img className="logo-header-img" src={Logo} alt="logo" />
            </div>
            <div className='css-icon-div'>
              <img className="css-icon" src={HomeIcon} alt="home-icon" />
            </div>
            <div className='css-text-div'>
            <Link to="/" className="no-underline"><p className='css-home-text no-underline'>Home</p></Link>
            <Link to="/login" className="no-underline"><p>Sign In</p></Link>
            <Link to="/register" className="no-underline"><p>Sign Up</p></Link>
              
            </div>
          </div>
        </div>
        <div className='css-orange-line'>

        </div>
      </header>
    </>
  )
}

export default Header

