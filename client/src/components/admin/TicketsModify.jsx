import '../../css/admin/ticketsAdd.css';
import { useState, useEffect } from 'react';
import { updateTicket } from '../../services/ticketServices.js';
import { getAllEvents } from '../../services/eventServices.js';
import { getAllUsers } from '../../services/userServices.js';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Dialog from '../../components/misc/dialog';
import TicketPNG from '../../assets/misc/ticket.png';

const ModifyTickets = () => {

  const location = useLocation();
  const { tickets } = location.state || { tickets: [] }; 
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [numberTickets, setNumberTickets] = useState(0);
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

  useEffect(() => {
    if (Array.isArray(tickets)) {
      const ticketToModify = tickets.find(ticket => ticket._id === id);
      if (ticketToModify) {
        setUserId(ticketToModify.userName._id);
        setEventId(ticketToModify.eventTitle._id);
        setNumberTickets(ticketToModify.numberTickets);
      }      
    }
  }, [id, tickets]);

    

  const handleReturn = () => {
    window.history.back(); 
  };

  const handleModifyTicket = async () => {
    if (!userId || !eventId || numberTickets <= 0) {
      setDialogTitle('Missing fields');
      setDialogMessage("Please ensure all fields are filled out correctly.");
      setIsDialogOpen(true);
      setDialogIsError(true);
      return;
    }
    
    try {
      const numTickets = Number(numberTickets);
      if (isNaN(numTickets)) {
        throw new Error('Number of tickets must be a number');
      }
      
      const response = await updateTicket(id, userId, eventId, numTickets);
      const updatedTickets = tickets.map(ticket => (ticket._id === id ? response : ticket));
      setSuccess("Ticket Successfully updated");
      setError("");
      navigate('/manage-tickets', { state: { tickets: updatedTickets } });
    } catch (error) {      
      console.error('Error updating ticket:', error.message);
      setDialogTitle('Error updating ticket');      
      setDialogMessage("Please try again later\n" + error.message);
      setIsDialogOpen(true);
      setDialogIsError(true);
    }
  };

  if (loading) return <div className="container"></div>;
  if (error) return <div className="container">{error}</div>;

  return (
      <div className="ticketModify-background">
          <div className="ticketModify-form-container">
              <div className="ticketModify-form-header">
                  <h1 className="page-main-title">Modify Ticket</h1>
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
                              <option value="">Select user</option>
                              {userNames.map((user) => (
                                  <option key={user._id} value={user._id}>
                                      {user.name}
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
                              onClick={handleModifyTicket}
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
  );
};

export default ModifyTickets;
