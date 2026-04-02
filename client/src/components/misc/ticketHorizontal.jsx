import '../../css/ticket.css';
import Barcode from '../../assets/misc/barcodeVert.png';

// eslint-disable-next-line react/prop-types
export default function TicketHorizontal ( { title, ticketsNum, venue, eventDate, address, ticketId, price, image } ) {

    return (
        <div className="ticketHorizontal" id={ticketId}>
            <div className="ticketHorizontal-image-div">
                <img
                    src={image}
                    alt={`Event image of ${title}`}
                    className="ticketHorizontal-image"
                />
            </div>
            <div className="ticketHorizontal-data">
                <div className="ticketHorizontal-badge">TICKET</div>
                <div className="ticketHorizontal-event-title">{title}</div>
                {/* <div className="ticketHorizontal-event-subtitle">
                    General Admission
                </div> */}
                <div className="ticketHorizontal-event-date">{eventDate}</div>

                <div className="ticketHorizontal-event-price">
                    {ticketsNum} {ticketsNum === 1 ? "TICKET" : "TICKETS"}
                </div>
                <div className="ticketHorizontal-event-venue">
                    {venue}
                    <br />
                    {address ? address : ""}
                    {address ? <br /> : ""}
                    Total Price: ${price * ticketsNum}
                </div>
                {/* 
                <div className="ticketHorizontal-number">
                    TICKET NUMBER:
                    <br />
                    {ticketId}
                </div> */}
            </div>
            <div className="ticketHorizontal-barcode-container">
                <img
                    src={Barcode}
                    alt={`Ticket Barcode`}
                    className="ticketHorizontal-barcode-img"
                />
            </div>
            <div className="ticketHorizontal-seat-container">
                <div className="ticketHorizontal-seat-item">
                    <div className="ticketHorizontal-seat-label">Tickets</div>
                    <div className="ticketHorizontal-seat-value">
                        {ticketsNum}
                    </div>
                </div>
                <div className="ticketHorizontal-seat-item">
                    <div className="ticketHorizontal-seat-label">Gate</div>
                    <div className="ticketHorizontal-seat-value">
                        {String(Math.floor(Math.random() * 24) + 1).padStart(
                            2,
                            "0",
                        )}
                    </div>
                </div>
                <div className="ticketHorizontal-seat-item">
                    <div className="ticketHorizontal-seat-label">Row</div>
                    <div className="ticketHorizontal-seat-value">
                        {String(Math.floor(Math.random() * 41) + 1).padStart(
                            2,
                            "0",
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}