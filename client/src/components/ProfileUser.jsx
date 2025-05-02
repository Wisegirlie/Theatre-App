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
  const [user, setUser] = useState({ name: '', email: '' });
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const { isLogged, role } = useAppContext();

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');
    const userId = localStorage.getItem('userId'); 

    
    // console.log("Profile - isLogged: " + isLogged);
    // console.log("Profile - role: " + role);

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
              {/* Name */}
              <div className="profile-label">User Name</div>
              <div className="profile-data" style={{ fontSize: "29px" }}>
                  {user.name}
              </div>
              {/* Email */}
              <div className="profile-label">Email</div>
              <div className="profile-data">{user.email}</div>
              {/* Role - only admin */}
              {isLogged && role === ROLES.ADMIN && (
                  <>
                      <div className="profile-label">Role</div>
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
