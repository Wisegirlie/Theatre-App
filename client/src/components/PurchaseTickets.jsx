import '../css/purchaseTickets.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEventTickets } from '../services/eventServices';
import { purchaseTicket } from '../services/ticketServices';

const handleReturn = () => {
  window.history.back();
};

function PurchaseTicket() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [tickets, setTickets] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id);
        setEventData(event);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const increaseTickets = async () => {
    if (eventData && tickets < eventData.ticketsAvailable) {
      setTickets(tickets + 1);
      setEventData({ ...eventData, ticketsAvailable: eventData.ticketsAvailable - 1 });
    }
  };

  const decreaseTickets = async () => {
    if (tickets > 0) {
      setTickets(tickets - 1);
      setEventData({ ...eventData, ticketsAvailable: eventData.ticketsAvailable + 1 });
    }
  };

  const handleConfirmPurchase = async () => {
    const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage

    if (eventData && tickets <= eventData.ticketsAvailable + tickets) {
      try {
        // Crear un nuevo ticket en la base de datos
        await purchaseTicket(userId, id, tickets);

        // Actualizar la cantidad de tickets disponibles en el evento
        const updatedTicketsAvailable = eventData.ticketsAvailable - tickets;
        await updateEventTickets(id, updatedTicketsAvailable);

        navigate('/tickets');
      } catch (error) {
        console.error('Error updating event:', error);
        alert('Purchase failed');
      }
    } else {
      alert('Not enough tickets available');
    }
  };

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="css-purchase-detail">
      <h1 className='page-main-title'>Purchase ticket for the following event:</h1>
      <div className="css-purchase-content">
        <img src={eventData.image} alt={eventData.title} className="css-event-image" />
        <div className="css-event-info">
          <h3 className="css-title">{eventData.title}</h3>
          <p className='css-purchaseDescription'>{eventData.description}</p>
          <div className='css-availableTickets'>
            {eventData.ticketsAvailable > 0
              ? `Available Tickets: ${eventData.ticketsAvailable}`
              : 'No tickets available'}
          </div>
          <div className="css-titulo">
            <p>Number of tickets to purchase:</p>
          </div>
          <div className="css-ticket-controls">
            <button className="css-button" onClick={decreaseTickets}>-</button>
            <span className='css-ticket'>{tickets}</span>
            <button className="css-button" onClick={increaseTickets}>+</button>
          </div>
          <button className="button-add button-margin-right" onClick={handleConfirmPurchase} disabled={eventData.ticketsAvailable === 0}>
            Confirm Purchase
          </button>
          <button onClick={handleReturn} className='button-back button-back-margint-top'>Return</button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseTicket;
