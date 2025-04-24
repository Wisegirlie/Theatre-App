import '../../css/ticketHorizontal.css';

export default function TicketHorizontal () {

    return (
        <div className="ticket">
        <div className="ticket-header">
            <div className="live-badge">LIVE MUSIC</div>
            <div className="event-title">MUSIC</div>
            <div className="event-subtitle">NIGHT</div>
        </div>

        <div className="event-date">JUNE 12, 10:00 PM</div>

        <div className="event-price">PRICE: $45</div>
        <div className="event-address">
            123 Anywhere st.,<br />
            Any City
        </div>

        <div className="ticket-number">TICKET NUMBER:<br />0123456789</div>

        <div className="seat-info">
            <div className="seat-item">
                <div className="seat-label">Gate</div>
                <div className="seat-value">12</div>
            </div>
            <div className="seat-item">
                <div className="seat-label">Row</div>
                <div className="seat-value">07</div>
            </div>
            <div className="seat-item">
                <div className="seat-label">Seat</div>
                <div className="seat-value">35</div>
            </div>
        </div>
    </div>
    )
}