import '../../css//admin/ticketsAdd.css'
import { useState, useEffect } from 'react';
import { createTicket } from '../../services/ticketServices';
import { getAllEvents } from '../../services/eventServices';
import { getAllUsers } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import TicketPNG from '../../assets/misc/ticket.png';
import Dialog from '../../components/misc/dialog';


const AddTickets = () => {  

  const [userId, setUserId] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [numberTickets, setNumberTickets] = useState(1);
  const navigate = useNavigate();

  const [error, setError] = useState('')  
  const [loading, setLoading] = useState(true); 
  const [success, setSuccess] = useState("");

    //   Declare Dialog Modal Fields
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogIsError, setDialogIsError] = useState("false");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching event titles:', error);
        setDialogTitle('Error fetching event titles');
        setDialogMessage("Please try again later");
        setIsDialogOpen(true);
        setDialogIsError(true);
      }
    };

     const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUserNames(data);        
      } catch (error) {
        console.error('Error fetching users:', error);
        setDialogTitle('Error fetching users');
        setDialogMessage("Please try again later");
        setIsDialogOpen(true);
        setDialogIsError(true);
      }
    };
    fetchEvents();
    fetchUsers(); 
    setLoading(false);
  }, []);

  const handleAddTicket = async () => {
    if (!userId || !eventId || numberTickets <= 0) {
      setDialogTitle('Missing fields');
      setDialogMessage("Please ensure all fields are filled out correctly.");
      setIsDialogOpen(true);
      setDialogIsError(true);
      return;
    }

    try {
      const response = await createTicket(userId, eventId, numberTickets);
      console.log('Ticket created successfully:', response);
      navigate('/manage-tickets');

    } catch (error) {
      console.error('Error creating ticket:', error.message);
      setDialogTitle('Error creating ticket');
      setDialogMessage("Please try again later\n" + error.message);
      setIsDialogOpen(true);
      setDialogIsError(true);

    }
  };

  const handleReturn = () => {
    window.history.back(); 
  };

  if (loading) return <div className="container"></div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <>
      <div className="ticketModify-background">
              <div className="ticketModify-form-container">
                  <div className="ticketModify-form-header">
                      <h1 className="page-main-title">Add Ticket</h1>
                  </div>
    
                  <div className="ticketModify-form-content">
                      {/* User icon */}
                      <div className="ticketModify-PNG-container">
                          <img
                              className="ticketModify-PNG"
                              src={TicketPNG}
                              alt="Ticket Icon"
                          />
                      </div>
    
                      <div className="ticketModify-form-fields">
                          <div className="ticketModify-form-group">
                              <label
                                  htmlFor="userId"
                                  className="ticketModify-form-label"
                              >
                                  User
                              </label>
                              <select
                                  className="ticketModify-form-input"
                                  value={userId}
                                  onChange={(e) => setUserId(e.target.value)}
                              >
                                  <option value="">Select a user</option>
                                  {userNames.map((user) => (
                                      <option key={user._id} value={user._id}>
                                          {user.firstName} {user.lastName}
                                      </option>
                                  ))}
                              </select>
                          </div>
    
                          <div className="ticketModify-form-group">
                              <label
                                  htmlFor="eventId"
                                  className="ticketModify-form-label"
                              >
                                  Event title
                              </label>
                              <select
                                  className="ticketModify-form-input"
                                  value={eventId}
                                  onChange={(e) => setEventId(e.target.value)}
                              >
                                  <option value="">Select an event</option>
                                  {events.map((event) => (
                                      <option key={event._id} value={event._id}>
                                          {event.title}
                                      </option>
                                  ))}
                              </select>
                          </div>
    
                          <div className="ticketModify-form-group">
                              <label
                                  htmlFor="numberTickets"
                                  className="ticketModify-form-label"
                              >
                                  Number of Tickets
                              </label>
                              <input
                                  className="ticketModify-form-input ticketModify-width80px"
                                  type="number"
                                  value={numberTickets}
                                  onChange={(e) =>
                                      setNumberTickets(Number(e.target.value))
                                  }
                              />
                          </div>
    
                          <div className="ticketModify-button-group">
                              <button
                                  className="button-modify"
                                  onClick={handleAddTicket}
                              >
                                  Save Changes
                              </button>
                              <button
                                  onClick={handleReturn}
                                  className="button-modify ticketModify-button-secondary"
                              >
                                  Return
                              </button>
                          </div>
    
                          {error && (
                              <div className="ticketModify-status-message ticketModify-error-message">
                                  {error}
                              </div>
                          )}
                          {success && (
                              <div className="ticketModify-status-message ticketModify-success-message">
                                  {success}
                              </div>
                          )}
                      </div>
                  </div>
              </div>
    
              {/*  Modal for messages  */}
              <Dialog
                  title={dialogTitle}
                  message={dialogMessage}
                  error={dialogIsError}
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
              />
          </div>




    {/* --------------------------------- */}
      {/* <div className='css-flex css-content-ticket'>
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
              <select className='css-input-insert' value={userName} onChange={(e) => setUserId(e.target.value)} >
                <option value={useId} selected>{userId}</option>
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
      <div></div> */}
    </>
  );
}

export default AddTickets;
