import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/eventServices';
import EventsCard from './misc/EventsCard';
import '../css/events.css';

const Events = ( props ) => {
  const [eventsData, setEventsData] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEventsData(events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);


  return (
      <section className="events-section-container" id="events">
          <h1 className="page-main-title">
            {props.title}
          </h1>
          <div className="events-container">
              {eventsData.map((event) => (
                  <EventsCard
                      key={event._id} // Utiliza `_id` en lugar de `id` si tu backend devuelve `_id`
                      id={event._id}
                      image={event.image}
                      title={event.title}
                      description={event.description}
                  />
              ))}              
          </div>
      </section>
  );
};

export default Events;
