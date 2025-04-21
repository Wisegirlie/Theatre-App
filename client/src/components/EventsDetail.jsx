import '../css/eventsDetail.css'
import Reviews from './Reviews'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEventById } from '../services/eventServices';

const handleReturn = () => {
  window.history.back(); 
};

const EventsDetail = () => {
  const { id } = useParams(); 
  const [eventData, setEventData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id); 
        // Format the date if it exists
        if (event.eventDate) {
            event.eventDate = event.eventDate.slice(0, 10);
          }
        setEventData(event); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
        console.error('An error occurred while loading the event:', error);
      }
    };
    fetchEvent();
  }, [id]);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;
    if (!eventData) return <div className="container">Event not found</div>;

  return (
      <div className="event-details-main-container container">
          <h1 className="page-main-title">{eventData.title}</h1>
          <div className="event-details-container">
              <div className="event-details-leftPanel">
                  <img
                      className="event-details-img"
                      src={eventData.image}
                      alt={`${eventData.title} Poster`}
                  />
                  <br></br>
                  <span className="event-details-text">
                      Remaining Tickets: {eventData.ticketsAvailable}
                  </span>
                  <span className='event-details-text-orange'>
                      Get yours!
                  </span>
              </div>
              <div className="event-details-rightPanel">
                  <div className="event-details-description-container">                        
                      <p className="event-details-description-text">
                            { loading && ( <div>Loading...</div> )}
                            { error && ( <div className="container">Error: {error}</div> )}
                            { !eventData && (<div className="container">Event not found</div>)}
                            {eventData.description}                          
                      </p>
                      <p className="event-details-description-text" style={{fontSize: '95%'}}>
                        {/* {eventData.eventDate && <><strong>Date:</strong> {eventData.eventDate}<br /></>} */}
                        <strong>Venue:</strong> {eventData.venue || 'Not defined yet'}<br /><br />
                        <strong>Address:</strong> {eventData.address || 'Not defined yet'}<br /><br />
                        <strong>Date:</strong> {eventData.eventDate || 'Not defined yet'}<br /><br />
                        <strong>Price:</strong> ${eventData.price?.toFixed(2) || '0'}<br />
                        
                      </p>
                      
                      <Link to={`/purchase-tickets/${id}`}>
                          <button className="button-green event-detail-button-right-margin" style={{marginTop: '20px'}}>
                              Get Tickets
                          </button>
                      </Link>
                      <button  onClick={handleReturn}>
                          Return
                      </button>
                      {/* <p
                          className=""
                          style={{
                              fontWeight: "bold",
                              marginTop: 40,
                              marginBottom: 20,
                          }}
                      >
                          Read Reviews
                      </p> */}
                  </div>
              </div>
          </div>

          {/* <Reviews />
          <Reviews />
          <Reviews />
          <Reviews /> */}
      </div>
  );
}

export default EventsDetail