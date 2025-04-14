import { Link } from 'react-router-dom';
import '../css/eventsCard.css';

const EventsCard = ({ id, image, title, description }) => {
  return (
    <>
      <div className='css-card-content'>
        <div className='css-img-div'>
          <img className='css-event-cover' src={image} alt={title} />
        </div>
        <div className='css-content-div'>
          <h1>{title}</h1>
          <div className='css-description'>{description}</div>
          <div className='css-button-div'>
            <Link to={`/event-detail/${id}`}>
              <button className='css-button-detail'>Details</button>
            </Link>
            <Link to={`/purchase-tickets/${id}`}>
              <button className='css-button-purchase'>Purchase Tickets</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsCard;
