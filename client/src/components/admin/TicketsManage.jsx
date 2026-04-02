import '../../css/admin/TicketsManage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllTickets, deleteTicket } from '../../services/ticketServices';
import Dialog from '../../components/misc/dialog';
import Spinner from '../misc/Spinner';
import DeleteConfirmationModal from '../misc/DeleteConfirmationModal';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  const handleDeleteClick = (ticket) => {
    setTicketToDelete(ticket);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ticketToDelete) return;

    setIsDeleting(true);
    try {
      await deleteTicket(ticketToDelete._id);
      const updatedTickets = tickets.filter(ticket => ticket._id !== ticketToDelete._id);
      setTickets(updatedTickets);
      const total = updatedTickets.reduce((acc, ticket) => acc + ticket.numberTickets, 0);
      setTotalTickets(total);
      setIsDeleteModalOpen(false);
      setTicketToDelete(null);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setDialogTitle('Error deleting ticket');
      setDialogMessage({error}.toString());
      setIsDialogOpen(true);
      setDialogIsError(true);
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
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


  if (loading) {
    return (      
        <Spinner size={64} ariaLabel="Loading tickets" />      
    );
  }
  
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
                                      onClick={() => handleDeleteClick(ticket)}
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
          {/*  Deletion Confirmation Modal  */}
          <DeleteConfirmationModal
              title="Delete Ticket"
              itemType="ticket"
              itemName={
                  ticketToDelete
                      ? `Ticket for ${ticketToDelete.eventTitle.title}\n${ticketToDelete.userName.firstName} ${ticketToDelete.userName.lastName} - ${ticketToDelete.numberTickets} ticket(s)`
                      : ""
              }
              message={`Are you sure you want to delete this ticket?`}
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDeleteConfirm}
              isLoading={isDeleting}
          />
      </section>
  );
};

export default ManageTickets;
