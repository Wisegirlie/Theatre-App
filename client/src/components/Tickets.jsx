import { useEffect, useState } from 'react';
import { getUserEventsAndTickets } from '../services/ticketServices';
import Ticket from './misc/ticket';
import TicketHorizontal from './misc/ticketHorizontal';
import Hero from './misc/Hero';
import HeroImage from '../assets/variety-images/pair_2.jpg';
import '../css/tickets.css';
import '../css/ticketHorizontal.css';
import DataNotFound from './misc/DataNotFound';
import { useNavigate } from 'react-router-dom';


const Tickets = () => {
    const [ticketData, setTicketData] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Obtener el userId del localStorage
    const userId = localStorage.getItem("userId");

    // functionality for the return button
    const handleReturn = () => {
        //   window.history.back();
        navigate("/");
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getUserEventsAndTickets(userId);
                setTicketData(tickets);
                // console.log(tickets);
                const total = tickets.reduce(
                    (sum, ticket) => sum + ticket.numberTickets,
                    0
                );
                setTotalTickets(total);
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setError("Error fetching tickets:");
            }
        };

        if (userId) {
            fetchTickets();
        } else {
            console.error("User ID not found in localStorage");
            setError("User ID not found in localStorage");
        }
        setLoading(false);
    }, [userId]);

    if (loading) return <div className="loading"></div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="tickets-main-container">
            <Hero
                picture={HeroImage}
                title={"My tickets"}
                buttonText={"Explore my purchases"}
                scrollId={"tickets"}
                size={"350px"}
            />

            <div className="tickets-text-header">
                <h1 className="page-main-title"></h1>
                {/* <div className="ticket-totals">
                    Total Tickets Purchased:&nbsp;&nbsp; {totalTickets}
                </div> */}
            </div>

            {totalTickets == 0 && (
                <DataNotFound message="You haven't purchased any ticket yet." />
            )}

            {totalTickets > 0 && (
                <div className="tickets-container" id="tickets">
                    {ticketData.map((ticket) => (
                        <TicketHorizontal
                            key={ticket._id}
                            title={ticket.eventTitle}
                            ticketsNum={ticket.numberTickets}
                            venue={ticket.event.venue}
                            eventDate={new Date(
                                ticket.event.eventDate
                            ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                            address={ticket.event.address}
                            ticketId={ticket._id.toString().toUpperCase()}
                            price={ticket.event.price}
                            image={ticket.event.image}
                        />
                    ))}
                    {ticketData.map((ticket, index) => (
                        <Ticket
                            key={index}
                            title={ticket.eventTitle}
                            ticketsNum={ticket.numberTickets}
                            venue={ticket.event.venue}
                            eventDate={new Date(
                                ticket.event.eventDate
                            ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                            address={ticket.event.address}
                            ticketId={ticket._id.toString().toUpperCase()}
                            price={ticket.event.price}
                            image={ticket.event.image}
                        />
                    ))}
                </div>
            )}

            <button onClick={handleReturn} className="tickets-button-back">
                Return
            </button>
        </div>
    );
}

export default Tickets;
