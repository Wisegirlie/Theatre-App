import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashBarRounded from '../assets/dashboard-img/assets-dash-rounded.png';
import TheaterPic from '../assets/events-img/asset-theatre.png';
import '../css/addEvents.css';
import { createEvent } from '../services/eventServices.js'; 

const AddEvent = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketsAvailable, setTicketsAvailable] = useState(0);
  const navigate = useNavigate();

  const defaultImageToBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], 'default-image.png', { type: blob.type });
  };

  
  const handleAddEvent = async () => {
    try {
      const finalImage = image ? image : await defaultImageToBlob(TheaterPic);
      await createEvent({
        image: finalImage,
        title,
        description,
        ticketsAvailable,
      });

      navigate('/manage-events');
    } catch (error) {
      console.error('An error occurred while adding the event:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    } else {
      setImage(null); 
    }
  };

  const handleReturn = () => {
    window.history.back(); 
  };

  return (
    <>
      <div className='css-flex css-content-ticket'>
        <div className='css-dashboard-div css-margin-right-0'>
          <h1 className='page-main-title'>Add Event</h1>
          <img className='css-dashbarRounded' src={DashBarRounded} alt="Dash Rounded" />
        </div>
        <div className='css-flex css-margin-top-25px'>
          <div>
            <img className='css-event-cover' src={image ? URL.createObjectURL(image) : TheaterPic} alt='event img' />
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
              <button onClick={handleAddEvent} className='button-add' style={{ marginRight: '40px' }}>
                Add Event
              </button>
              <button onClick={handleReturn} className='button-back'>Return</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
