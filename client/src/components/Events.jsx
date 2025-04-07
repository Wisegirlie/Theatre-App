import EventsCard from './EventsCard';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/eventServices';
import './css/eventsCard.css';

const Events = () => {
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
    <>
      <div>
        <h1 className='page-main-title title-margin-bottom'>Events</h1>
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
    </>
  );
};

export default Events;
