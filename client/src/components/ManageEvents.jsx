import './css/manageEvents.css';
import './css/eventsCard.css';
import DashBar from '../assets/dashboard-img/asset-dash-rounded.png';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent } from '../services/eventServices.js';

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

  const handleModifyEventClick = (id) => {
    navigate(`/modify-event/${id}`, { state: { events } });
  };

  const handleDeleteEvent = async (index, id) => {
    try {
      await deleteEvent(id);
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <>
      <div className='css-main'>
        <div className='css-left-side'>
          <div className=''>
            <h1 className='page-main-title'>Manage Events</h1>
            <img src={DashBar} className='dashbar-rounded dashbar-manageEvents' alt="Dash Bar" />
          </div>
          <div>
            <button className='button-add' onClick={handleAddEventClick}>Add new event</button>
            <br></br>
            <Link to="/superDashboard">
              <button className='css-return-dashboard'>return to dashboard</button>
            </Link>
          </div>
          <div>
            <div className='text-data'>Total Events registered: {events.length}</div>
          </div>
        </div>

        <div className='css-main-manage-events'>
          {events.map((event, index) => (
            <div key={index} className='css-rigth-side'>
              <div className='css-img-div'>
                <img className='css-event-cover' src={event.image} alt={event.title} />
              </div>
              <div>
                <h1>{event.title}</h1>
                <div>{event.description}</div>
              </div>
              <div>                
                  <button className='button-modify' onClick={() => handleModifyEventClick(event._id)}>Modify</button>
                  <button className='button-delete' onClick={() => handleDeleteEvent(index, event._id)}>Delete</button>                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageEvents;
