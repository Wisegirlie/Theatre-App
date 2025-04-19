import { Link } from 'react-router-dom';
import '../../css/admin/eventsCardAdmin.css';

const EventsCardAdmin = ({ id, image, title, description }) => {
    return (
        <div className="admin-card-container">
            <Link to={`/modify-event/${id}`}>            
                <div className="card-image-container">
                    <img
                        className="admin-card-image"
                        src={image}
                        alt={title + " thumbnail"}
                    />
                </div>
                <div className="admin-card-info-container">
                    <h3 className="card-title">{title}</h3>
                    <div className="card-event-description">
                        {description}
                    </div>
                    <button className="admin-card-button button-modify">Modify</button>
                   
                </div>
            </Link>
        </div>
    );
};

export default EventsCardAdmin;
