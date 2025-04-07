import iconUser from '../assets/profile-img/icon-user-for-profile.png';
import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import './css/profileUser.css';
import { useEffect, useState } from 'react';
import { getUserEventsAndTickets } from '../services/ticketServices';

// functionality for the return button
const handleReturn = () => {
  window.history.back(); 
};

const ProfileUser = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [ticketsPurchased, setTicketsPurchased] = useState(0);

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');
    const userId = localStorage.getItem('userId'); 

    if (userName && userEmail) {
      setUser({ name: userName, email: userEmail });
    }

    const fetchTickets = async () => {
      try {
        const tickets = await getUserEventsAndTickets(userId);
        const total = tickets.reduce((sum, ticket) => sum + ticket.numberTickets, 0);
        setTicketsPurchased(total);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (userId) {
      fetchTickets();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  return (
    <>
      <div className='css-flex css-flex-align' id='div-main'>
        <div className='profile-title-div'>
          <h1 className='page-main-title'>User Profile</h1>
          <img className='css-dashbarRounded dashbar-user-title' src={DashBarRounded} alt="Dash Rounded" />
        </div>
        <div className='profile-card'>
          <div id='div-left' className='css-dashboard-div'>
            <img src={iconUser} alt="User icon" className='profile-user-icon' />
          </div>
          <div id='div-right' className='css-padding-top-30'>
            <h3>
              <span className='css-color-darkGrey css-margin-right-10'>
                User Name:&nbsp;&nbsp;
              </span>
              <span className='css-font-bold css-font-size-bigger'>
                {user.name}
              </span>
            </h3>
            <h3>
              <span className='css-color-darkGrey css-margin-right-10'>
                E-mail:&nbsp;&nbsp;
              </span>
              <span className='css-font-bold css-font-size-bigger'>
                {user.email}
              </span>
            </h3>
            <h3 className='css-color-darkGrey gray-text-medium-size'>
              Tickets Purchased: &nbsp;&nbsp; {ticketsPurchased}
            </h3>
            <button onClick={handleReturn} className='button-back'>Return</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
