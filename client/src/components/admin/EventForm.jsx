import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TheaterPic from "../../assets/shows/event_default_image.png";
import { updateEvent, getEventById, deleteEvent, createEvent } from "../../services/eventServices.js";
import DeleteConfirmationModal from '../misc/DeleteConfirmationModal';
import Spinner from '../misc/Spinner';
import Dialog from '../misc/dialog';
import DialogAwait from '../misc/dialogAwait';
import "../../css/admin/eventsAdd.css";

const EventForm = () => {
    const { id } = useParams(); // If id exists, we're in modify mode
    const navigate = useNavigate();
    const isModifyMode = !!id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ticketsAvailable, setTicketsAvailable] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(isModifyMode ? null : TheaterPic);
    const [venue, setVenue] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    // Initialize with today's date in add mode, empty string in modify mode
    const [eventDate, setEventDate] = useState(isModifyMode ? '' : new Date().toISOString().split('T')[0]);
    const [price, setPrice] = useState(0.00);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageLoading, setImageLoading] = useState(isModifyMode);
    
    // Dialog states
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogIsError, setDialogIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogAwaitOpen, setIsDialogAwaitOpen] = useState(false);
    const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);
    
    useEffect(() => {
        if (!isModifyMode) {
            // In add mode, show default image immediately without loading state
            setImageLoading(false);
            return;
        }

        const fetchEvent = async () => {
            try {
                const eventToModify = await getEventById(id);
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
                    // imageLoading will be set to false by img onLoad event
                }
            } catch (error) {
                console.error("Failed to fetch event: ", error);
                setImagePreview(TheaterPic);
                setImageLoading(false);
            }
        };
        fetchEvent();
    }, [id, isModifyMode]);

    const showDialog = (title, message, errorState) => {
        return new Promise((resolve) => {
            setDialogTitle(title);
            setDialogMessage(message);
            setIsDialogAwaitOpen(true);
            setDialogIsError(errorState);
            setDialogPromiseResolver(() => () => {
                resolve();
            });
        });
    };

    const defaultImageToBlob = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new File([blob], "default-image.png", { type: blob.type });
    };

    const handleSaveEvent = async () => {
        // Validate title field
        if (!title || title.trim() === '') {
            setDialogTitle(isModifyMode ? "Update Failed" : "Creation Failed");           
            setDialogMessage("The event title is required and cannot be empty.");
            setDialogIsError(true);
            setIsDialogOpen(true);
            return;
        }

        // Validate description field
        if (!description || description.trim() === '') {
            setDialogTitle(isModifyMode ? "Update Failed" : "Creation Failed");
            setDialogMessage("The event description is required.");
            setDialogIsError(true);
            setIsDialogOpen(true);
            return;
        }

        try {
            let finalImage;
            
            // Check if image is a File object (new upload) or a string (existing URL)
            if (image instanceof File) {
                finalImage = image;
            } else if (typeof image === 'string' && image) {
                // Convert existing image URL to File object
                finalImage = await defaultImageToBlob(image);
            } else {
                // Use default image (convert local import to File)
                finalImage = await defaultImageToBlob(TheaterPic);
            }
            
            const eventData = {
                image: finalImage,
                title,
                description,
                ticketsAvailable,
                venue, 
                eventDate,         
                ticketsSold, 
                price
            };

            if (isModifyMode) {
                await updateEvent(id, eventData);
                await showDialog(
                    "Event Updated",
                    `The event "${title}" has been successfully updated.`,
                    false
                );
            } else {
                await createEvent(eventData);
                await showDialog(
                    "Event Created",
                    `The event "${title}" has been successfully created.`,
                    false
                );
            }

            navigate("/manage-events");
        } catch (error) {
            console.error(`An error occurred while ${isModifyMode ? 'updating' : 'adding'} the event:`, error);
            setDialogTitle(isModifyMode ? "Update Failed" : "Creation Failed");
            setDialogMessage(`Failed to ${isModifyMode ? 'update' : 'create'} event:\n${error.message}`);
            setDialogIsError(true);
            setIsDialogOpen(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageLoading(true);
            setImage(file);
            const newPreview = URL.createObjectURL(file);
            setImagePreview(newPreview);
            // onLoad handler will set imageLoading to false
        } else {
            setImage(null);
            setImagePreview(TheaterPic);
            setImageLoading(false);
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
            const response = await deleteEvent(id);
            setIsDeleteModalOpen(false);
            setIsDeleting(false); // Reset before showing dialog so it can render
            
            const deletedTicketsCount = response.ticketsDeleted || 0;
            const ticketsMessage = deletedTicketsCount === 0 
                ? "No associated tickets were found."
                : `${deletedTicketsCount} associated ${deletedTicketsCount === 1 ? 'ticket has' : 'tickets have'} been permanently removed.`;
            
            await showDialog(
                "Event Deleted",
                `The event "${title}" has been deleted.\n\n${ticketsMessage}`,
                false,
            );
            navigate("/manage-events");
        } catch (error) {
            console.error('Failed to delete event:', error);
            setIsDeleting(false);
            setDialogTitle("Deletion Failed");
            setDialogMessage(`Failed to delete event:\n${error.message}`);
            setDialogIsError(true);
            setIsDialogOpen(true);
        }
    };

    if (isDeleting) {
        return (
            <Spinner size={64} ariaLabel="Deleting event" />            
        );
    }

    return (
        <div className="event-details-main-container addEvent-main-container container">
            <h1 className="page-main-title">{isModifyMode ? 'Modify Event' : 'Add Event'}</h1>
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
                        {imagePreview && (
                            <img
                                className="event-details-img"
                                src={imagePreview}
                                alt="Event Poster"
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    console.error('Failed to load image:', imagePreview);
                                    setImagePreview(TheaterPic);
                                    setImageLoading(false);
                                }}
                                style={{ 
                                    display: 'block', 
                                    width: '100%',
                                    opacity: imageLoading ? 0 : 1,
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                            />
                        )}
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
                            required
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
                            required
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
                            {isModifyMode ? 'Venue Capacity:' : 'Tickets Available:'}
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
                            htmlFor="event-tickets-sold"
                            className="addEvent-label"
                        >
                            Tickets sold:
                        </label>
                        <input
                            name="event-tickets-sold"
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
                        onClick={handleSaveEvent}
                        className={`${isModifyMode ? 'button-modify' : 'button-green'} event-detail-button-right-margin`}
                    >
                        <i className="fa fa-floppy-o"></i> {isModifyMode ? 'Save changes' : 'Save Event'}
                    </button>
                    <button
                        onClick={handleReturn}
                        className={`button-back ${isModifyMode ? 'event-detail-button-right-margin' : ''}`}
                    >
                        <i className="fa fa-times-circle-o"></i> Cancel
                    </button>
                    {isModifyMode && (
                        <button
                            onClick={handleDeleteClick}
                            className="button-orange"
                        >
                            <i className="fa fa-trash-o"></i> Delete event
                        </button>
                    )}
                </div>
            </div>

            {isModifyMode && (
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
            )}

            {/* Dialog for errors */}
            <Dialog
                title={dialogTitle}
                message={dialogMessage}
                error={dialogIsError}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />

            {/* DialogAwait for success messages */}
            <DialogAwait
                title={dialogTitle}
                message={dialogMessage}
                error={dialogIsError}
                isOpen={isDialogAwaitOpen}
                onClose={() => setIsDialogAwaitOpen(false)}
                resolvePromise={dialogPromiseResolver}
            />
        </div>
    );
};

export default EventForm;
