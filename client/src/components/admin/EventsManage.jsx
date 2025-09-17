import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventServices.js';
import EventsCard from './EventsCardAdmin.jsx';
import '../../css/admin/manageEvents.css';
import '../../css/events.css';


const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    navigate('/add-event');
  };

  if (loading) return <div className="container"></div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!events) return <div className="container">Events not found</div>;


  return (
      <section className="manageEvents-section-container" id="Manageevents">
          <h1 className="page-main-title">Manage Events</h1>
          <div className="admin-events-text">
              <p>Total Events registered: {events.length}</p>
              <button className="button-add" onClick={handleAddEventClick}>
                  Add new event
              </button>
          </div>

          <div className="events-container">
              {events.map((event) => (
                  <EventsCard
                      key={event._id} // Utiliza `_id` en lugar de `id` si tu backend devuelve `_id`
                      id={event._id}
                      image={event.image}
                      title={event.title}
                      description={event.description}                      
                  />
              ))}
          </div>

          {/* <button className='button-delete' onClick={() => handleDeleteEvent(index, event._id)}>Delete</button> */}
      </section>
  );
};

export default ManageEvents;
