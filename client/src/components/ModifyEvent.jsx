import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import TheaterPic from '../assets/events-img/asset-theatre.png';
import './css/addEvents.css';
import { updateEvent } from '../services/eventServices';

const ModifyEvent = () => {
  const location = useLocation();
  const { events } = location.state || { events: [] }; // Recibe los eventos de la ubicación
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketsAvailable, setTicketsAvailable] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(TheaterPic);

  useEffect(() => {
    if (Array.isArray(events)) {
      const eventToModify = events.find(event => event._id === id);
      if (eventToModify) {
        setTitle(eventToModify.title);
        setDescription(eventToModify.description);
        setTicketsAvailable(eventToModify.ticketsAvailable);
        setImage(eventToModify.image);
      }
    }
  }, [id, events]);

  const defaultImageToBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], 'default-image.png', { type: blob.type });
  };

  const handleModifyEvent = async () => {
    try {
      const finalImage = image ? image : await defaultImageToBlob(TheaterPic);
      const updatedEvent = {
        image: finalImage,
        title,
        description,
        ticketsAvailable,
      };

      const updatedData = await updateEvent(id, updatedEvent);

      const updatedEvents = events.map(event => (event._id === id ? updatedData : event));
      navigate('/manage-events', { state: { events: updatedEvents } });
    } catch (error) {
      console.error('An error occurred while updating the event:', error);
    }
  };

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null); 
      setImagePreview(TheaterPic);
    }

  };

  const handleReturn = () => {
    window.history.back(); 
  };

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='css-color-darkOrange css-margin-none'>Modify Event</h1>
          <img className='css-dashbarRounded' src={DashBarRounded} alt="Dash Rounded" />
        </div>
        <div className='css-flex css-margin-top-25px'>
          <div>
            <img className='css-event-cover' src={imagePreview} alt='event img'/>
            <input type='file' onChange={handleImageChange} />
          </div>
          <div className='css-margin-left-40px'>
            <div className='css-margin-bottom-30px'>
              <span className='css-black-bold'>Title:</span>
              <input
                className='css-input-insert css-margin-left-50px'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
            </div>
            <div className='css-margin-bottom-30px'>
              <div className='css-flex'>
                <div className='css-description-div'>
                  <span className='css-black-bold'>Description:</span>
                </div>
                <div className='css-description-div'>
                  <textarea
                    placeholder='Tell users what is this Event about'
                    className='css-input-insert css-textarea-description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className='css-margin-bottom-30px'></div>
              <span className='css-black-bold'>Tickets Available:</span>
              <input
                className='css-input-insert css-tickets-width'
                type='number'
                value={ticketsAvailable}
                onChange={(e) => setTicketsAvailable(parseInt(e.target.value))}
              />
              <br />
              <button onClick={handleModifyEvent} className='button-add' style={{ marginRight: '40px' }}>
                Modify Event
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyEvent;
