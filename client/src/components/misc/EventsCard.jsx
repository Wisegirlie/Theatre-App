import { Link } from 'react-router-dom';
import '../../css/eventsCard.css';

const EventsCard = ({ id, image, title, description }) => {
  return (    
      <div className='card-container fadeInDown'>
        <Link to={`/event-detail/${id}`}>
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
          
            <button className='card-button'>View more</button>
          
          {/* <Link to={`/purchase-tickets/${id}`}>
            <button className='card-button card-button-purchase'>Purchase Tickets</button>
          </Link> */}
        {/* </div> */}
      </div>
      </Link>
    </div>    
  );
};

export default EventsCard;
