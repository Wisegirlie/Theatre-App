import '../../css/admin/ticketsForm.css';
import { useState, useEffect } from 'react';
import { createTicket, updateTicket, getTicketById } from '../../services/ticketServices.js';
import { getAllEvents, getEventById, updateEventTickets } from '../../services/eventServices.js';
import { getAllUsers } from '../../services/userServices.js';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '../misc/dialog';
import DialogAwait from '../misc/dialogAwait';
import TicketPNG from '../../assets/misc/ticket.png';
import Spinner from '../misc/Spinner';

const TicketForm = () => {
    const { id } = useParams(); // If id exists, we're in modify mode
    const navigate = useNavigate();
    const isModifyMode = !!id;

    const [userId, setUserId] = useState('');
    const [userNames, setUserNames] = useState([]);
    const [eventId, setEventId] = useState('');
    const [events, setEvents] = useState([]);
    const [numberTickets, setNumberTickets] = useState(1);
    const [originalNumberTickets, setOriginalNumberTickets] = useState(0);
    const [loading, setLoading] = useState(true);

    // Dialog states
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogIsError, setDialogIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogAwaitOpen, setIsDialogAwaitOpen] = useState(false);
    const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch events and users
                const [eventsData, usersData] = await Promise.all([
                    getAllEvents(),
                    getAllUsers()
                ]);
                setEvents(eventsData);
                setUserNames(usersData);

                // If in modify mode, fetch ticket data from API
                if (isModifyMode) {
                    try {
                        const ticketData = await getTicketById(id);
                        if (ticketData) {
                            setUserId(ticketData.userName._id || ticketData.userName);
                            setEventId(ticketData.eventTitle._id || ticketData.eventTitle);
                            setNumberTickets(ticketData.numberTickets);
                            setOriginalNumberTickets(ticketData.numberTickets);
                        }
                    } catch (error) {
                        console.error('Error fetching ticket:', error);
                        setDialogTitle('Error Loading Ticket');
                        setDialogMessage("Failed to load ticket data. Please try again.\n" + error.message);
                        setDialogIsError(true);
                        setIsDialogOpen(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setDialogTitle('Error Loading Data');
                setDialogMessage("Failed to load events or users. Please try again later.");
                setDialogIsError(true);
                setIsDialogOpen(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    const handleSaveTicket = async () => {
        // Validation
        if (!userId || !eventId || numberTickets <= 0) {
            setDialogTitle('Missing Fields');
            setDialogMessage("Please ensure all fields are filled out correctly.");
            setDialogIsError(true);
            setIsDialogOpen(true);
            return;
        }

        try {
            const numTickets = Number(numberTickets);
            if (isNaN(numTickets) || numTickets <= 0) {
                setDialogTitle('Invalid Input');
                setDialogMessage('Number of tickets must be a positive number.');
                setDialogIsError(true);
                setIsDialogOpen(true);
                return;
            }

            if (isModifyMode) {
                // MODIFY MODE: Calculate ticket difference and update
                const ticketDifference = numTickets - originalNumberTickets;
                
                // Get the current event data
                const currentEvent = await getEventById(eventId);
                if (!currentEvent) {
                    throw new Error('Event not found');
                }

                // Calculate new available tickets
                const newAvailableTickets = currentEvent.ticketsAvailable - ticketDifference;

                // Check if there are enough tickets available (only if increasing)
                if (ticketDifference > 0 && ticketDifference > currentEvent.ticketsAvailable) {
                    setDialogTitle('Not Enough Tickets');
                    setDialogMessage(
                        currentEvent.ticketsAvailable === 0
                            ? "No tickets available for this event."
                            : `Only ${currentEvent.ticketsAvailable} additional tickets available for this event.`
                    );
                    setDialogIsError(true);
                    setIsDialogOpen(true);
                    return;
                }

                // Update the ticket
                await updateTicket(id, userId, eventId, numTickets);
                
                // Update the event's available tickets
                await updateEventTickets(eventId, newAvailableTickets);

                await showDialog(
                    "Ticket Updated",
                    `The ticket has been successfully updated.`,
                    false
                );
            } else {
                // ADD MODE: Check availability and create
                const selectedEvent = events.find(event => event._id === eventId);
                if (!selectedEvent) {
                    setDialogTitle('Error');
                    setDialogMessage("Selected event not found.");
                    setDialogIsError(true);
                    setIsDialogOpen(true);
                    return;
                }

                // Check if there are enough tickets available
                if (numTickets > selectedEvent.ticketsAvailable) {
                    setDialogTitle('Not Enough Tickets');
                    setDialogMessage(
                        selectedEvent.ticketsAvailable === 0
                            ? "No tickets available for this event."
                            : `Only ${selectedEvent.ticketsAvailable} tickets available for this event.`
                    );
                    setDialogIsError(true);
                    setIsDialogOpen(true);
                    return;
                }

                // Create the ticket
                await createTicket(userId, eventId, numTickets);

                // Update the event's available tickets
                const updatedTicketsAvailable = selectedEvent.ticketsAvailable - numTickets;
                await updateEventTickets(eventId, updatedTicketsAvailable);

                await showDialog(
                    "Ticket Created",
                    `The ticket has been successfully created.`,
                    false
                );
            }

            navigate('/manage-tickets');
        } catch (error) {
            console.error(`Error ${isModifyMode ? 'updating' : 'creating'} ticket:`, error);
            setDialogTitle(isModifyMode ? 'Error Updating Ticket' : 'Error Creating Ticket');
            setDialogMessage(`Please try again later.\n${error.message}`);
            setDialogIsError(true);
            setIsDialogOpen(true);
        }
    };

    const handleReturn = () => {
        window.history.back();
    };

    if (loading) {
        return <Spinner size={64} ariaLabel="Loading ticket form" />;
    }

    return (
        <div className="ticketModify-background">
            <div className="ticketModify-form-container">
                <div className="ticketModify-form-header">
                    <h1 className="page-main-title">
                        {isModifyMode ? 'Modify Ticket' : 'Add Ticket'}
                    </h1>
                </div>

                <div className="ticketModify-form-content">
                    {/* Ticket icon */}
                    <div className="ticketModify-PNG-container">
                        <img
                            className="ticketModify-PNG"
                            src={TicketPNG}
                            alt="Ticket Icon"
                        />
                    </div>

                    <div className="ticketModify-form-fields">
                        {/* User selection */}
                        <div className="ticketModify-form-group">
                            <label
                                htmlFor="userId"
                                className="ticketModify-form-label"
                            >
                                User
                            </label>
                            <select
                                id="userId"
                                className="ticketModify-form-input"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            >
                                <option value="">Select a user</option>
                                {userNames.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Event selection */}
                        <div className="ticketModify-form-group">
                            <label
                                htmlFor="eventId"
                                className="ticketModify-form-label"
                            >
                                Event Title
                            </label>
                            <select
                                id="eventId"
                                className="ticketModify-form-input"
                                value={eventId}
                                onChange={(e) => setEventId(e.target.value)}
                                required
                            >
                                <option value="">Select an event</option>
                                {events.map((event) => (
                                    <option key={event._id} value={event._id}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Number of tickets */}
                        <div className="ticketModify-form-group">
                            <label
                                htmlFor="numberTickets"
                                className="ticketModify-form-label"
                            >
                                Number of Tickets
                            </label>
                            <input
                                id="numberTickets"
                                className="ticketModify-form-input ticketModify-width80px"
                                type="number"
                                min="1"
                                value={numberTickets}
                                onChange={(e) =>
                                    setNumberTickets(Number(e.target.value))
                                }
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="ticketModify-button-group">
                            <button
                                className="button-modify"
                                onClick={handleSaveTicket}
                            >
                                <i className="fa fa-floppy-o"></i> {isModifyMode ? 'Save Changes' : 'Create Ticket'}
                            </button>
                            <button
                                onClick={handleReturn}
                                className="button-modify ticketModify-button-secondary"
                            >
                                <i className="fa fa-arrow-left"></i> Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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

export default TicketForm;
