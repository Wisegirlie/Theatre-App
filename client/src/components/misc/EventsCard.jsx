import { Link } from 'react-router-dom';
import '../../css/eventsCard.css';

const EventsCard = ({ id, image, title, description }) => {
  return (
    <div className='card-container fadeInDown'>
      <div className='card-image-container'>
        <img className='card-image' src={image} alt={title + " thumbnail"} />
      </div>
      <div className='card-info-container'>
        <h3 className='card-title'>
          {title}
        </h3>
        <div className='card-event-description'>
          {description}
        </div>
        {/* <div className='card-button-container'> */}
          <Link to={`/event-detail/${id}`}>
            <button className='card-button'>View more</button>
          </Link>
          {/* <Link to={`/purchase-tickets/${id}`}>
            <button className='card-button card-button-purchase'>Purchase Tickets</button>
          </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EventsCard;
