import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TheaterPic from '../../assets/shows/event_default_image.png';
import '../../css/eventsDetail.css'
import '../../css/admin/addEvents.css';
import { createEvent, deleteEvent } from '../../services/eventServices.js'; 

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
      <div className="event-details-main-container addEvent-main-container container">
          <h1 className="page-main-title">Add Event</h1>
          <div className="event-details-container">
              {/* LEFT PANEL */}
              <div className="event-details-leftPanel addEvent-leftPanel">
                  <img
                      className="event-details-img"
                      src={image ? URL.createObjectURL(image) : TheaterPic}
                      alt="Event Poster"
                  />
                  <label htmlFor="file" style={{ marginRight: "10px" }}>
                        Event image (max 2Mb):
                  </label>
                  <input
                      type="file"
                      onChange={handleImageChange}
                      className="event-input-file"
                      style={{ marginTop: "5px" }}
                  />
              </div>
              {/* RIGHT PANEL */}
              <div className="event-details-rightPanel addEvent-rightPanel">
                  {/* Event title */}
                  <div className="addEvent-container">
                      <label htmlFor="event-title" className="addEvent-label">
                          Title:
                      </label>
                      <input
                          type="text"
                          id="event-title"
                          name="event-title"
                          className="addEvent-input"
                          placeholder="Enter event title"
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </div>
                  {/* Event description */}
                  <div className="addEvent-container">
                      <label
                          htmlFor="event-description"
                          className="addEvent-label"
                      >
                          Description:
                      </label>
                      <textarea
                          name="event-description"
                          placeholder="Enter event description and highlights"
                          className="addEvent-input addEvent-input-textarea"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>
                  {/* Venue */}
                  <div className="addEvent-container">
                      <label htmlFor="venue" className="addEvent-label">
                          Venue:
                      </label>
                      <input
                          type="text"
                          id="venue"
                          name="venue"
                          className="addEvent-input"
                          placeholder="Where is the event taking place"
                      />
                  </div>

                  {/* From Date */}
                  <div className="addEvent-container">
                      <label htmlFor="event-date" className="addEvent-label">
                          Date:
                      </label>
                      <input
                          name="event-date"
                          className="addEvent-input addEvent-input-date-width"
                          type="date"
                      />
                  </div>
                  {/* Tickets Available */}
                  <div className="addEvent-container">
                      <label
                          htmlFor="event-tickets-available"
                          className="addEvent-label"
                      >
                          Tickets Available:
                      </label>
                      <input
                          name="event-tickets-available"
                          className="addEvent-input addEvent-input-tickets-width"
                          type="number"
                          value={ticketsAvailable}
                          onChange={(e) =>
                              setTicketsAvailable(parseInt(e.target.value))
                          }
                      />
                  </div>
                  {/* Tickets Sold */}
                  <div className="addEvent-container">
                      <label
                          htmlFor="event-tickets-available"
                          className="addEvent-label"
                      >
                          Tickets sold:
                      </label>
                      <input
                          name="event-tickets-available"
                          className="addEvent-input addEvent-input-tickets-width"
                          type="number"    
                          value={0}                                                
                      />
                  </div>
                  {/* Price */}
                  <div className="addEvent-container">
                      <label htmlFor="event-price" className="addEvent-label">
                          Price:
                      </label>
                      <input
                          name="event-price"
                          className="addEvent-input addEvent-input-tickets-width"
                          type="number"
                      />
                  </div>

                  {/* Buttons */}
                  <button
                      onClick={handleAddEvent}
                      className="button-green event-detail-button-right-margin"
                  >
                      Save Event
                  </button>
                  <button onClick={handleReturn} className="button-back">
                      Cancel
                  </button>
              </div>
          </div>
      </div>
  );
};

export default AddEvent;
