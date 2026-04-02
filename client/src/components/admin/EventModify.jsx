import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TheaterPic from "../../assets/shows/event_default_image.png";
import { updateEvent, getEventById, deleteEvent } from "../../services/eventServices.js";
import DeleteConfirmationModal from '../misc/DeleteConfirmationModal';
import Spinner from '../misc/Spinner';
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
    const [imagePreview, setImagePreview] = useState(null);
    const [venue, setVenue] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [eventDate, setEventDate] = useState('');
    const [price, setPrice] = useState(0.00);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    

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
                    setImageLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch event: ", error);
                setImageLoading(false);
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
            setImageLoading(true);
            setImage(file);
            const newPreview = URL.createObjectURL(file);
            setImagePreview(newPreview);
        } else {
            setImageLoading(true);
            setImage(null);
            setImagePreview(TheaterPic);
        }
    };

    const handleReturn = () => {
        window.history.back();
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await deleteEvent(id);
            setIsDeleteModalOpen(false);
            navigate("/manage-events");
        } catch (error) {
            console.error('Failed to delete event:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isDeleting) {
        return (
            <Spinner size={64} ariaLabel="Deleting event" />            
        );
    }

    return (
        <div className="event-details-main-container addEvent-main-container container">
            <h1 className="page-main-title">Modify Event</h1>
            <div className="event-details-container">
                {/* LEFT PANEL */}
                <div className="event-details-leftPanel addEvent-leftPanel">
                    <div style={{ position: 'relative', width: '100%', minHeight: '380px' }}>
                        {imageLoading && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                zIndex: 10
                            }}>
                                <Spinner size={48} ariaLabel="Loading event image" />
                            </div>
                        )}
                        <img
                            className="event-details-img"
                            src={imagePreview}
                            alt="Event Poster"
                            onLoad={() => setImageLoading(false)}
                            style={{ display: 'block', width: '100%' }}
                        />
                    </div>
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
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>

                    {/* Buttons */}
                    <button
                        onClick={() => handleModifyEvent(id)}
                        className="button-modify event-detail-button-right-margin"
                    >
                        Save changes
                    </button>
                    <button
                        onClick={handleReturn}
                        className="button-back event-detail-button-right-margin"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="button-orange"
                    >
                        <i className="fa fa-trash-o"></i> Delete event
                    </button>
                </div>
            </div>

            <DeleteConfirmationModal
                title="Delete Event"
                itemType="event"
                itemName={title}
                message={`Are you sure you want to delete this event?\n\nAll associated tickets will be permanently removed.`}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default ModifyEvent;
