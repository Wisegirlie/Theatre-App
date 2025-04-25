import '../../css/ticket.css';
import Barcode from '../../assets/misc/barcodeHoriz.png';

export default function Ticket ( { title, ticketsNum, venue, eventDate, address, ticketId, price, image } ) {

    return (
        <div className="ticket">
            <div className="ticket-image-div">
                <img
                    src={image}
                    alt={`Event image of ${title}`}
                    className="ticket-image"
                />
            </div>
            <div className="ticket-data">
                <div className="ticket-badge">TICKET</div>
                <div className="ticket-event-title">{title}</div>
                <div className="ticket-event-subtitle">General Admission</div>
                <div className="ticket-event-date">{eventDate}</div>
            </div>            

            <div className="ticket-event-price">PRICE: ${price}</div>
            <div className="ticket-event-venue">
                {venue} 
                <br />
                {address}
            </div>

            <div className="ticket-number">
                TICKET NUMBER:
                <br />
                {ticketId}
            </div>
            <div className="ticket-barcode-container">
                <img
                    src={Barcode}
                    alt={`Ticket Barcode`}
                    className="ticket-barcode-img"
                />
            </div>

            <div className="ticket-seat-container">
                <div className="ticket-seat-item">
                    <div className="ticket-seat-label">Tickets</div>
                    <div className="ticket-seat-value">{ticketsNum}</div>                    
                </div>
                <div className="ticket-seat-item">
                    <div className="ticket-seat-label">Gate</div>
                    <div className="ticket-seat-value">{String(Math.floor(Math.random() * 24) + 1).padStart(2, '0')}</div>
                </div>
                <div className="ticket-seat-item">
                    <div className="ticket-seat-label">Row</div>
                    <div className="ticket-seat-value">{String(Math.floor(Math.random() * 41) + 1).padStart(2, '0')}</div>
                </div>
            </div>
        </div>
    );
}