import '../css/manageTickets.css';
import TicketImg from '../assets/dashboard/asset-ticket.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllTickets, deleteTicket } from '../services/ticketServices';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets();
        setTickets(data);
        const total = data.reduce((acc, ticket) => acc + ticket.numberTickets, 0);
        setTotalTickets(total);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      const updatedTickets = tickets.filter(ticket => ticket._id !== id);
      setTickets(updatedTickets);
      const total = updatedTickets.reduce((acc, ticket) => acc + ticket.numberTickets, 0);
      setTotalTickets(total);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleModifyTicketClick = (id) => {
    navigate(`/modify-ticket/${id}`, { state: { tickets } });
  };

  return (
    <div className="manage-tickets-container">
      <div className="sidebar">
        <h1 className='page-main-title'>Manage Tickets</h1>
        <div className="progress-bar"></div>
        <Link to="/addTickets">
          <button className="button-add">Add new ticket</button>
        </Link>
        <div className='text-data'>Total Tickets Purchased: {totalTickets}</div>
      </div>
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="ticket-card">
            <img src={TicketImg} alt="Ticket" className="ticket-image" />
            <div className="ticket-info">
              <p>User: <strong>{ticket.userName.name}</strong></p>
              <p>Event: <strong>{ticket.eventTitle.title}</strong></p>
              <p>Tickets: <strong>{ticket.numberTickets}</strong></p>
            </div>
            <div className="ticket-actions">
              <button className="button-modify" onClick={() => handleModifyTicketClick(ticket._id)}>Modify</button>
              <button className="button-delete" onClick={() => handleDelete(ticket._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTickets;
