import { Link } from 'react-router-dom'
import Logo from '../assets/home-img/LOGO-for-LIGHT-background.png'
import './css/registeredconfirmation.css'

const RegisteredConfirmation = () => {

    return (
        <>
        <div className='css-confirmation-div'>
            <div>
                <img className src={Logo } />
            </div>
            <div>
                <h2>Your user has been registered</h2>
            </div>
            <div>
            <Link to="/login">
                <p>click here to go to LogIn</p>
            </Link>
                
            </div>
        </div>
        </>
      )
      
}

export default RegisteredConfirmation