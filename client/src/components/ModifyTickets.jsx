import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import TicketPic from '../assets/dashboard-img/asset-ticket.png';
import './css/addTickets.css';
import { useState, useEffect } from 'react';
import { updateTicket } from '../services/ticketServices';
import { getAllEvents } from '../services/eventServices';
import { getAllUsers } from '../services/userServices';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const handleReturn = () => {
  window.history.back(); 
};




const ModifyTickets = () => {
  const location = useLocation();
  const { tickets } = location.state || { tickets: [] }; 
  const { id } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [eventTitles, setEventTitles] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [numberTickets, setNumberTickets] = useState(0);
  const [error, setError] = useState('')


  useEffect(() => {
    const fetchEventTitles = async () => {
      try {
        const data = await getAllEvents();
        setEventTitles(data);
      } catch (error) {
        console.error('Error fetching event titles:', error);
      }
    };

     const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUserNames(data);
        // Set the logged-in user's name if available
        const loggedInUser = localStorage.getItem('name') || '';
        setUserName(loggedInUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchEventTitles();
    fetchUsers(); 
  }, []);

  useEffect(() => {
    if (Array.isArray(tickets)) {
      const ticketToModify = tickets.find(ticket => ticket._id === id);
      if (ticketToModify) {
        setUserName(ticketToModify.userName.name);
        setEventTitle(ticketToModify.eventTitle.title);
        setNumberTickets(ticketToModify.numberTickets);
      }
    }
  }, [id, tickets]);

  const handleModifyTicket = async () => {
    try {
      const numTickets = Number(numberTickets);
      if (isNaN(numTickets)) {
        throw new Error('Number of tickets must be a number');
      }
      
      const response = await updateTicket(id, numTickets);
      const updatedTickets = tickets.map(ticket => (ticket._id === id ? response : ticket));
      navigate('/manage-tickets', { state: { tickets: updatedTickets } });
    } catch (error) {
      setError('Error updating ticket:', error.message);
    }
  };

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='page-main-title'>Modify Ticket</h1>
          <img className='css-dashbarRounded' src={DashBarRounded} />
        </div>
        <div className='css-flex'>
          <div>
            <img src={TicketPic} />
          </div>
          <div className='css-margin-left-40px'>
            <div className='css-margin-bottom-30px'>
              <span className='css-black-bold'>User Name:</span>
              <select className='css-input-insert' value={userName} onChange={(e) => setUserName(e.target.value)} >
                <option value={userName} selected>{userName}</option>
                  {userNames.map((user) => (
                    <option key={user._id} value={user.name}>{user.name}</option>
                  ))}   
              </select>
              <br></br>
            </div>
            <div className='css-margin-bottom-30px'>
              <span className='css-black-bold'>Event Title:</span>
              <select className='css-input-insert' value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}>
                <option value="">Select an event</option>
                {eventTitles.map((event) => (
                  <option key={event._id} value={event._id}>{event.title}</option>
                ))}
              </select>
              <br></br>
              <div className='css-margin-bottom-30px'></div>
              <span className='css-black-bold'>Number of Tickets:</span>
              <input
                className='css-input-insert css-tickets-width'
                type='number'
                value={numberTickets}
                onChange={(e) => setNumberTickets(Number(e.target.value))}
              />
              <br></br>
              {error && <p style={{ color: 'red', fontSize: 15 }}>{error}</p>}
              <button
                className='button-add'
                style={{ marginRight: '40px' }}
                onClick={handleModifyTicket}
              >
                Modify Ticket
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ModifyTickets;
