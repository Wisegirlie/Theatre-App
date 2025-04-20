import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DashBarRounded from "../../assets/dashboard/assets-dash-rounded.png";
import TheaterPic from "../../assets/shows/event_default_image.png";
import "../../css/admin/addEvents.css";
import { updateEvent } from "../../services/eventServices.js";

const ModifyEvent = () => {
    const location = useLocation();
    const { events } = location.state || { events: [] }; // Recibe los eventos de la ubicación
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ticketsAvailable, setTicketsAvailable] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(TheaterPic);

    useEffect(() => {
        if (Array.isArray(events)) {
            const eventToModify = events.find((event) => event._id === id);
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
            };

            const updatedData = await updateEvent(id, updatedEvent);

            const updatedEvents = events.map((event) =>
                event._id === id ? updatedData : event
            );
            navigate("/manage-events", { state: { events: updatedEvents } });
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
                        Event image:
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
                        onClick={handleModifyEvent}
                        className="button-cyan event-detail-button-right-margin"
                    >
                        Modify Event
                    </button>
                    <button onClick={handleReturn} className="button-back">
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyEvent;
