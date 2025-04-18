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

  if (loading) return <div>Loading...</div>;

  return (
      <div className="event-details-main-container container">
          <h1 className="page-main-title">{eventData.title}</h1>
          <div className="event-details-container">
              <div className="event-details-leftPanel">
                  <img
                      className="event-details-img"
                      src={eventData.image}
                      alt={"{eventData.title} Poster"}
                  />
                  <br></br>
                  <span className="text-data">
                      Available Tickets: {eventData.ticketsAvailable}
                  </span>
                  <span
                      style={{
                          color: "#ff891b",
                          fontWeight: "bold",
                          fontSize: "15px",
                      }}
                  >
                      Get yours!
                  </span>
              </div>
              <div className="event-details-rightPanel">
                  {/* <h2 className="remove-margin css-margin-bottom-10px">
                      {eventData.title}
                  </h2> */}
                  <div className="event-details-description-container">
                      <p className="event-details-description-text">
                          {eventData.description}
                      </p>
                      <p className="event-details-description-text">
                        <strong>Date:</strong>  <br />
                        <strong>Venue:</strong>  <br />
                        <strong>Adress:</strong>  <br />
                        <strong>Price:</strong>  <br />
                      </p>
                      
                      <Link
                          to={`/purchase-tickets/${id}`}
                          className="no-underline"
                      >
                          <button className="button-green event-detail-button-right-margin">
                              Get Ticket
                          </button>
                      </Link>
                      <button
                          onClick={handleReturn}
                          className=""
                      >
                          Return
                      </button>
                      <p
                          className=""
                          style={{
                              fontWeight: "bold",
                              marginTop: 40,
                              marginBottom: 20,
                          }}
                      >
                          {/* Read Reviews */}
                      </p>
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