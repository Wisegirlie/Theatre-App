import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/eventServices';
import EventsCard from './misc/EventsCard';
import '../css/events.css';

const Events = ( props ) => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEventsData(events);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="container"></div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!eventsData) return <div className="container">Events not found</div>;

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
