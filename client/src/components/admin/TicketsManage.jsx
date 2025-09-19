import '../../css/admin/TicketsManage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllTickets, deleteTicket } from '../../services/ticketServices';
import Dialog from '../../components/misc/dialog';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  //   Declare Dialog Modal Fields
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogIsError, setDialogIsError] = useState("false");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets();
        setTickets(data);
        setLoading(false);
        const total = data.reduce((acc, ticket) => acc + ticket.numberTickets, 0);
        setTotalTickets(total);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to fetch tickets: ' + error.message);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleDeleteTicket = async (id) => {
    try {
      await deleteTicket(id);
      const updatedTickets = tickets.filter(ticket => ticket._id !== id);
      setTickets(updatedTickets);
      const total = updatedTickets.reduce((acc, ticket) => acc + ticket.numberTickets, 0);
      setTotalTickets(total);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setDialogTitle('Error deleting ticket');
      setDialogMessage({error}.toString());
      setIsDialogOpen(true);
      setDialogIsError(true);
    }
  };

  const handleModifyTicket = (id) => {
    navigate(`/modify-ticket/${id}`, { state: { tickets } });
  };
  
   // functionality for the return button
    const handleReturn = () => {
        // window.history.back();
        navigate('/');
    };


  if (loading) return <div className="loader-container"></div>;
  if (error) return <div className="container">{error}</div>;
  if (!tickets) return <div className="container">Ticets not found</div>;

  return (
      <section className="ticketsManage-section-container" id="ManageTickets">
          <h1 className="page-main-title">Manage Tickets</h1>
          <div className="ticketsManage-text">
              <p>Total Tickets Sold: {totalTickets}</p>
              <Link to="/add-ticket">
                  <button className="button-add">Add new ticket</button>
              </Link>
          </div>
          <div className="ticketsManage-table-container">
            {totalTickets > 0 &&
              <table className="ticketsManage-table">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>User</th>
                          <th>Event</th>
                          <th>Quantity</th>
                          <th>Created</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {tickets.map((ticket, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{ticket.userName.firstName} {ticket.userName.lastName}</td>
                              <td>{ticket.eventTitle.title}</td>
                              <td>{ticket.numberTickets}</td>
                              <td>
                                  {ticket.createdAt
                                      ? ticket.createdAt.slice(0, 10)
                                      : "undefined"}
                              </td>
                              <td>
                                  <button
                                      className="ticketsManage-action-btn edit-btn"
                                      onClick={() =>
                                          handleModifyTicket(ticket._id)
                                      }
                                  >
                                      Edit
                                  </button>

                                  <button
                                      className="ticketsManage-action-btn delete-btn"
                                      onClick={() =>
                                          handleDeleteTicket(ticket._id)
                                      }
                                  >
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            }                  
            {/*  No tickets found  */}
            {totalTickets == 0 && 
              <div className="ticketsManage-noTickets">No tickets found.</div>
            }
          </div>    
          <button onClick={handleReturn} className="ticketsManage-button-back">
              Return
          </button>
          {/*  Modal for messages  */}
          <Dialog
              title={dialogTitle}
              message={dialogMessage}
              error={dialogIsError}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
          />
      </section>
  );
};

export default ManageTickets;
