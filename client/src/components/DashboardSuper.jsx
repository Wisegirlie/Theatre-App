import DashBar from '../assets/dashboard/asset-dash-rounded.png'
import iconUser from '../assets/profile/icon-user-for-profile.png'
import EventImage from '../assets/shows/event_wicked.jpg'
import TicketImage from '../assets/dashboard/asset-ticket.png'
import '../css/dashboard.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsersCount } from '../services/userServices.js';
import { getEventsCount } from '../services/eventServices.js'
import { getTicketsCount } from '../services/ticketServices.js'

const DashboardSuper = () => {
  const [usersRegistered, setUsersRegistered] = useState(0);
  const [eventsRegistered, setEventsRegistered] = useState(0);
  const [ticketsPurchased, setTicketsPurchased] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersCount = await getUsersCount();
        setUsersRegistered(usersCount);

        const eventsCount = await getEventsCount();
        setEventsRegistered(eventsCount);

        const ticketsCount = await getTicketsCount();
        setTicketsPurchased(ticketsCount);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className='css-flex css-align-baseline css-dashboard-info'>
        {/* -------- Left pane ------------*/}
        <div className='css-dashboard-div' id='div-left'>
          <h1 className='css-color-darkOrange css-margin-none'>Admin Dashboard</h1>
          <img src={DashBar} className='asset-rounded-dash-super'/>
          <div className='super-data' id="super-data">
              Users Registered..:&nbsp;&nbsp; {usersRegistered} <br />
              Events Registered:&nbsp;&nbsp; {eventsRegistered} <br />
              Tickets Purchased:&nbsp;&nbsp; {ticketsPurchased} <br />
          </div>
        </div>

        {/* -------- Right pane ------------*/}
        <div id='div-right'>
          <h3 className='css-margin-none super-options-container'>
            <div className="super-options">
              <Link to="/manageusers" className="no-underline">
                <div className="super-options-img-div">
                  <img src={iconUser} alt="Manage Users" className='super-options-img'/>
                </div>              
                <div className="super-options-text">
                  Manage Users
                </div>
              </Link>
            </div>            
            <div className="super-options">
              <Link to="/manage-events" className="no-underline">
                <div className="super-options-img-div">
                  <img src={EventImage} alt="Manage Events" className='super-options-img'/>
                </div>              
                <div className="super-options-text">
                  Manage Events
                </div>
              </Link>
            </div>
            <div className="super-options">
              <Link to="/manage-tickets" className="no-underline">
                <div className="super-options-img-div super-options-img-div-ticket">
                  <img src={TicketImage} alt="Manage Tickets" className='super-options-img-ticket'/>
                </div>              
                <div className="super-options-text">
                  Manage Tickets
                </div>
              </Link>
            </div>
          </h3>
        </div>
      </div>
    </>
  );
}

export default DashboardSuper;
