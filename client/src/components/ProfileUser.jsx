import '../css/profileUser.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext.jsx';
import { ROLES } from '../constants/roles.js';
import { getUserEventsAndTickets } from '../services/ticketServices';
import BackPicture from '../assets/variety-images/theatre-day_2.jpg';

// functionality for the return button
const handleReturn = () => {
  window.history.back(); 
};

const ProfileUser = () => {
  const [user, setUser] = useState({ id: '', firstName: '', lastName: '', userName: '', email: '' });
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const { isLogged, role } = useAppContext();

  useEffect(() => {
    setUser({ 
      id: localStorage.getItem('userId'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),      
      userName: localStorage.getItem('userName'),
      email: localStorage.getItem('email')      
    });  

    const fetchTickets = async () => {
      try {
        const tickets = await getUserEventsAndTickets(user.id);
        const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.numberTickets, 0);
        setTicketsPurchased(totalTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (user.id) {
      fetchTickets();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  return (
      <div className="profile-main-container" id="profile">
          {/*  Background  */}
          <img
              className="profile-hero-img"
              alt="Theatre General Image"
              src={BackPicture}
          />

          <div className="profile-card">
              {/* User icon */}
              <div className="profile-user-img-container">
                  <span className="fa fa-user-o"></span>
              </div>
              {/* First Name */}
              <div className="profile-label">First Name</div>
              <div className="profile-data" style={{ fontSize: "29px" }}>
                  {user.firstName}
              </div>
              {/* Last Name */}
              <div className="profile-label">Last Name</div>
              <div className="profile-data" style={{ fontSize: "29px" }}>
                  {user.lastName}
              </div>
              {/* User Name */}
              <div className="profile-label">Username</div>
              <div className="profile-data" style={{ fontSize: "29px" }}>
                  {user.userName}
              </div>
              {/* Email */}
              <div className="profile-label">Email</div>
              <div className="profile-data">{user.email}</div>
              {/* Role - only admin */}
              {isLogged && role === ROLES.ADMIN && (
                  <>
                      <div className="profile-label" style={{marginTop: '20px'}}>Role</div>
                      <div
                          className="profile-data"
                          style={{ color: "var(--light-green-button)" }}
                      >
                          System Administrator
                      </div>
                  </>
              )}
              {/* Role - only general user */}
              {isLogged && role === ROLES.USER && (
                  <>
                      <br />
                      <div className="profile-data profile-tickets">
                          Total tickets purchased: &nbsp;{ticketsPurchased}
                      </div>
                  </>
              )}

              <button onClick={handleReturn} className="button-back">
                  Return
              </button>
          </div>
      </div>
  );
}

export default ProfileUser;
