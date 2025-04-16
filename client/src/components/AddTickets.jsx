import DashBarRounded from '../assets/dashboard/assets-dash-rounded.png'
import TicketPic from '../assets/dashboard/asset-ticket.png'
import '../css/addTickets.css'
import { useState, useEffect } from 'react';
import { createTicket } from '../services/ticketServices';
import { getAllEvents } from '../services/eventServices';
import { getAllUsers } from '../services/userServices';
import { useNavigate } from 'react-router-dom';

const handleReturn = () => {
  window.history.back(); 
};

const AddTickets = () => {  
  const [userName, setUserName] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTitles, setEventTitles] = useState([]);
  const [numberTickets, setNumberTickets] = useState(1);
  const navigate = useNavigate();

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

  const handleAddTicket = async () => {
    try {
      const response = await createTicket(userName, eventTitle, numberTickets);
      console.log('Ticket created successfully:', response);
      navigate('/manage-tickets');

    } catch (error) {
      console.error('Error creating ticket:', error.message);

    }
  };

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='page-main-title'>Add Ticket</h1>
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
                min={0}
                onChange={(e) => setNumberTickets(e.target.value)}
              />
              <br></br>
              <button
                className='button-add'
                style={{ marginRight: '40px' }}
                onClick={handleAddTicket}
              >
                Add Ticket
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default AddTickets;
