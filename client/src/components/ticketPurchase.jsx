import '../css/ticketPurchase.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEventTickets } from '../services/eventServices';
import { purchaseTicket } from '../services/ticketServices';
import Dialog from './misc/dialog';
import DialogAwait from './misc/dialogAwait';

const handleReturn = () => {
  window.history.back();
};


function PurchaseTicket() {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [tickets, setTickets] = useState(1);    
    const navigate = useNavigate();
    
    //   Declare Dialog Modal Fields
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogIsError, setDialogIsError] = useState("false");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogAwaitOpen, setIsDialogAwaitOpen] = useState(false);
    const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);


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

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await getEventById(id);
                setEventData(event);                
            } catch (error) {                
                console.error("Error fetching event:", error);
                //  Set Dialog fields
                setDialogTitle("Error");
                setDialogMessage("Error fetching event");
                setIsDialogOpen(true);
                setDialogIsError(true);
            }
        };
        fetchEvent();
    }, [id]);

    const increaseTickets = async () => {
        if (eventData && tickets < eventData.ticketsAvailable) {
            setTickets(tickets + 1);
            // setEventData({ ...eventData, ticketsAvailable: eventData.ticketsAvailable - 1 });
        }
    };

    const decreaseTickets = async () => {
        if (tickets > 1) {
            setTickets(tickets - 1);
            // setEventData({ ...eventData, ticketsAvailable: eventData.ticketsAvailable + 1 });
        }
    };

    const handleConfirmPurchase = async () => {
        const userId = localStorage.getItem("userId"); // Obtener el userId desde localStorage
        console.log("Tickets available: " + eventData.ticketsAvailable);
        console.log("Tickets to purchase: " + tickets);

        if (eventData && tickets <= eventData.ticketsAvailable) {
            try {
                // Crear un nuevo ticket en la base de datos
                await purchaseTicket(userId, id, tickets);

                // Actualizar la cantidad de tickets disponibles en el evento
                const updatedTicketsAvailable =
                    eventData.ticketsAvailable - tickets;
                await updateEventTickets(id, updatedTicketsAvailable);
                await showDialog(
                    "Purchase Successful",
                    "Your ticket has been added to your account.",
                    false
                );
                navigate("/tickets");
            } catch (error) {
                console.error("Error updating event:", error);
                // alert("Purchase failed");
                //  Set Dialog fields
                setDialogTitle("Purchase failed");
                setDialogMessage("Please check your info and try again.");
                setIsDialogOpen(true);
                setDialogIsError(true);
            }
        } else {
            // alert("Not enough tickets available");
            //  Set Dialog fields
            setDialogTitle("Tickets are sold out");
            setDialogMessage("Purchases are disabled");
            setIsDialogOpen(true);
            setDialogIsError(null);
        }
    };

    if (!eventData) return <div></div>;

    return (
        <div className="ticket-purchase-container">
            {/*  Background  */}            
            {/* <img
              className="ticket-purchase-background"
              alt="Theatre General Image"
              src={eventData.image}
          />           */}
            <div className="ticket-purchase-card">
                <h1 className="ticket-purchase-title">
                    You are purchasing tickets for the following event:
                </h1>
                <div className="ticket-purchase-img-div">
                    <img
                        src={eventData.image}
                        alt={eventData.title}
                        className="ticket-purchase-img"
                    />
                </div>
                <h3 className="ticket-purchase-eventTitle">
                    {eventData.title}
                </h3>
                <p className="ticket-purchase-eventDescription">
                    {eventData.description}
                </p>
                {eventData.ticketsAvailable > 0 && (
                    <>
                        <div className="ticket-purchase-inputTitle">
                            <p>Number of tickets to purchase:</p>
                        </div>

                        <div className="ticket-purchase-controls-div ">
                            <button
                                className="ticket-purchase-AmountButton"
                                onClick={decreaseTickets}
                            >
                                -
                            </button>
                            <span className="ticket-purchase-ticketsToPurchase">
                                {tickets}
                            </span>
                            <button
                                className="ticket-purchase-AmountButton"
                                onClick={increaseTickets}
                            >
                                +
                            </button>
                        </div>
                    </>
                )}
                <div className="ticket-purchase-availableTickets">
                    {eventData.ticketsAvailable > 0
                        ? `Tickets available: ${eventData.ticketsAvailable}`
                        : "This event is Sold Out"}
                </div>
                {eventData.ticketsAvailable > 0 && (
                    <button
                        className="button-green"
                        onClick={handleConfirmPurchase}
                        style={{ marginTop: "20px" }}
                    >
                        Confirm Purchase
                    </button>
                )}
                <button
                    onClick={handleReturn}
                    className="button-back button-back-margint-top"
                    style={{ marginTop: "20px" }}
                >
                    Cancel
                </button>
            </div>
            <Dialog
                title={dialogTitle}
                message={dialogMessage}
                error={dialogIsError}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
            <DialogAwait
                title={dialogTitle}
                message={dialogMessage}
                error={dialogIsError}
                isOpen={isDialogAwaitOpen}
                onClose={() => setIsDialogAwaitOpen(false)}
                resolvePromise={dialogPromiseResolver}
            />
            ; ;
        </div>
    );
}

export default PurchaseTicket;
