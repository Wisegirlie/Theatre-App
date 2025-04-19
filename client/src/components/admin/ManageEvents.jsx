import DashBar from '../../assets/dashboard/asset-dash-rounded.png';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent } from '../../services/eventServices.js';
import EventsCard from './EventsCardAdmin';
import '../../css/admin/manageEvents.css';
import '../../css/events.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    navigate('/my-addEvents');
  };

  // const handleModifyEventClick = (id) => {
  //   navigate(`/modify-event/${id}`, { state: { events } });
  // };

  // const handleDeleteEvent = async (index, id) => {
  //   try {
  //     await deleteEvent(id);
  //     const updatedEvents = events.filter((_, i) => i !== index);
  //     setEvents(updatedEvents);
  //   } catch (error) {
  //     console.error('Failed to delete event:', error);
  //   }
  // };

  return (
      <section className="manageEvents-section-container" id="Manageevents">
          <h1 className="page-main-title">Manage Events</h1>
          <div className='admin-events-text'>
            <p>Total Events registered: {events.length}</p>
            <button className='button-add' onClick={handleAddEventClick}>
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
