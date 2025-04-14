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
    <>

      <div>
        <h1 className='page-main-title'>Event Details</h1>
      </div>
      <div className='css-flex'>
        <div>
          <img className='css-event-cover' src={eventData.image} />
          <br></br>
          <span className='text-data'>Available Tickets: {eventData.ticketsAvailable}</span>          
          <span style={{ color: "#ff891b", fontWeight: "bold", fontSize: "15px"  }}>Get yours!</span>
        </div>
        <div className='css-event-detail-div'>
          <h2 className='remove-margin css-margin-bottom-10px'>{eventData.title}</h2>
          <div className='css-event-description-text'>
            <p className='css-remove-styling css-margin-top-0px'>{eventData.description}</p>
            <Link to={`/purchase-tickets/${id}`} className='no-underline'>
              <button className='button-purchase button-orange button-margin-right'>Purchase Ticket</button>
            </Link>
            <button onClick={handleReturn} className='button-back button-back-eventDetails'>Return</button>
            <p className='css-remove-styling' style={{ fontWeight: "bold", marginTop: 40, marginBottom: 20 }}>Read Reviews</p>
            <Reviews />
            <Reviews />
            <Reviews />
            <Reviews />
          </div>
        </div>

      </div>
    </>
  )
}

export default EventsDetail