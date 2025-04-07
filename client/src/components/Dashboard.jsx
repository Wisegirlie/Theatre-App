import { useEffect, useState } from 'react';
import DashBar from '../assets/dashboard-img/asset-dash-rounded.png';
import DashboardTickets from './DashboardTickets';
import './css/dashboard.css';
import { getUserEventsAndTickets } from '../services/ticketServices'; 

const Dashboard = () => {
  const [user, setUser] = useState({ name: '' });
  const [tickets, setTickets] = useState([]);
  const [orderMake, setOrderMake] = useState(0);

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userId = localStorage.getItem('userId'); 

    if (userName) {
      setUser({ name: userName });
    }

    if (userId) {
      
      getUserEventsAndTickets(userId)
        .then((data) => {
          setTickets(data);
          setOrderMake(data.length); 
        })
        .catch((error) => {
          console.error('Error fetching user tickets:', error);
        });
    }
  }, []);

  return (
    <>
      <div className='css-flex css-align-baseline css-dashboard-info'>
        <div className='css-dashboard-div'>
          <h1 className='css-color-darkOrange css-margin-none'>User Dashboard</h1>
          <img className='asset-rounded-dash' src={DashBar} />
        </div>
        <div>
          <h3 className='css-margin-none'>
            <span className='css-color-darkGrey css-margin-none'>
              User Name:&nbsp;&nbsp;
            </span>
            <span className='css-color-lightOrange'>
              {user.name}
            </span>
          </h3>
          <h3 className='css-color-darkGrey css-margin-bottom  css-font-size'>
            Orders made:&nbsp;&nbsp; {orderMake}
          </h3>
          <h3 className='css-font-bold'>Your Tickets:</h3>  <br />
          {tickets.map((ticket, index) => (
            <DashboardTickets key={index} title={ticket.eventTitle} ticketsNum={ticket.numberTickets} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
