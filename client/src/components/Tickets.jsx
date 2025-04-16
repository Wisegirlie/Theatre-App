import DashBar from '../assets/dashboard/asset-dash-rounded.png';
import DashboardTickets from './DashboardTickets';
import '../css/dashboard.css';
import { useEffect, useState } from 'react';
import { getUserEventsAndTickets } from '../services/ticketServices';

// functionality for the return button
const handleReturn = () => {
  window.history.back(); 
};

const Tickets = () => {
  const [ticketData, setTicketData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);

  // Obtener el userId del localStorage
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getUserEventsAndTickets(userId);
        setTicketData(tickets);
        const total = tickets.reduce((sum, ticket) => sum + ticket.numberTickets, 0);
        setTotalTickets(total);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (userId) {
      fetchTickets();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]);

  return (
    <>
      <div className='css-flex css-align-baseline css-dashboard-info'>
        <div className='css-dashboard-div'>
          <h1 className='page-main-title'>My Tickets</h1>
          <img className='css-dashbar' src={DashBar} />
          <div className='text-data'>
            Tickets Purchased:&nbsp;&nbsp; {totalTickets}
          </div>
        </div>
        <div>
          {ticketData.map((ticket, index) => (
            <DashboardTickets key={index} title={ticket.eventTitle} ticketsNum={ticket.numberTickets} />
          ))}
        </div>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button onClick={handleReturn} className='button-back'>Return</button>
      </div>
    </>
  );
}

export default Tickets;
