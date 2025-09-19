import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TheaterPic from "../../assets/shows/event_default_image.png";
import { updateEvent, getEventById, deleteEvent } from "../../services/eventServices.js";
import "../../css/admin/eventsAdd.css";

const ModifyEvent = ( events ) => {
    // const location = useLocation();
    // const { events } = location.state || { events: [] }; // Recibe los eventos de la ubicación
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ticketsAvailable, setTicketsAvailable] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(TheaterPic);
    const [venue, setVenue] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [eventDate, setEventDate] = useState('');
    const [price, setPrice] = useState(0.00);
    

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventToModify = await getEventById(id); // API call
                if (eventToModify) {
                    setTitle(eventToModify.title || "");
                    setDescription(eventToModify.description || "");
                    setTicketsAvailable(eventToModify.ticketsAvailable || 0);
                    setVenue(eventToModify.venue || "");
                    setTicketsSold(eventToModify.ticketsSold || 0);
                    setPrice(eventToModify.price || 0);
                    setEventDate(eventToModify.eventDate?.slice(0, 10) || "");
                    setImage(eventToModify.image || null);
                    setImagePreview(eventToModify.image || TheaterPic);
                }
            } catch (error) {
                console.error("Failed to fetch event: ", error);
                // redirect or show error message
            }
        };
        fetchEvent();
    }, [id, events]);

    const defaultImageToBlob = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new File([blob], "default-image.png", { type: blob.type });
    };

    const handleModifyEvent = async () => {
        try {
            const finalImage = image
                ? image
                : await defaultImageToBlob(TheaterPic);
            const updatedEvent = {
                image: finalImage,
                title,
                description,
                ticketsAvailable,
                venue, 
                eventDate,         
                ticketsSold, 
                price
            };

            const updatedData = await updateEvent(id, updatedEvent);

            // // const updatedEvents = events.map((event) =>
            // //     event._id === id ? updatedData : event
            // );
            navigate("/manage-events");
        } catch (error) {
            console.error("An error occurred while updating the event:", error);
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

  const handleDeleteEvent = async ( id ) => {
    try {
      await deleteEvent(id);
      // const updatedEvents = events.filter((_, i) => i !== index);
      // setEvents(updatedEvents);
      navigate("/manage-events");
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

    return (
        <div className="event-details-main-container addEvent-main-container container">
            <h1 className="page-main-title">Modify Event</h1>
            <div className="event-details-container">
                {/* LEFT PANEL */}
                <div className="event-details-leftPanel addEvent-leftPanel">
                    <img
                        className="event-details-img"
                        src={imagePreview}
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
                            value={title}
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
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                    </div>

                    {/* From Date */}
                    <div className="addEvent-container">
                        <label htmlFor="event-date" className="addEvent-label">
                            Event Date:
                        </label>
                        <input
                            name="event-date"
                            className="addEvent-input addEvent-input-date-width"
                            type="date"
                            id="eventDate"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                    </div>
                    {/* Tickets Available */}
                    <div className="addEvent-container">
                        <label
                            htmlFor="event-tickets-available"
                            className="addEvent-label"
                        >
                            Venue Capacity:
                        </label>
                        <input
                            name="event-tickets-available"
                            className="addEvent-input addEvent-input-tickets-width"
                            type="number"
                            value={ticketsAvailable}
                            onChange={(e) => setTicketsAvailable(parseInt(e.target.value))}
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
                            value={ticketsSold}
                            onChange={(e) =>
                                setTicketsSold(parseInt(e.target.value))
                            }                                                  
                        />
                    </div>
                    {/* Price */}
                    <div className="addEvent-container addEvent-margin-bottom">
                        <label htmlFor="event-price" className="addEvent-label">
                            Price:
                        </label>
                        <input
                            name="event-price"
                            className="addEvent-input addEvent-input-tickets-width"
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(Number(e.target.value))
                            }    
                        />
                    </div>

                    {/* Buttons */}
                    <button
                        onClick={() => handleModifyEvent(id)}
                        className="button-modify event-detail-button-right-margin"
                    >
                        Save changes
                    </button>
                    <button onClick={handleReturn} className="button-back event-detail-button-right-margin">
                        Cancel
                    </button>
                    <button onClick={() => handleDeleteEvent(id)} className="button-orange">
                        Delete event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyEvent;
