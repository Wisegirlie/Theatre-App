import TicketPic from '../assets/dashboard-img/asset-ticket.png'
import './css/dashboardTickets.css'

const DashboardTickets = ({ title, ticketsNum }) => {

  return (
    <>
      <div className='css-tickets-info'>
        <div className='css-ticketsPic-div'>
          <img className='css-tickets-pic' src={TicketPic} />
        </div>
        <div className='css-content-text'>
          <p className='css-margin-top-none'><span className='css-event-ticket-text'>Event: </span> <span className='css-value-text'> {title}</span></p>
          <p className='css-margin-top-none'><span className='css-event-ticket-text'>Tickets: </span> <span className='css-value-text'> {ticketsNum}</span></p>
        </div>
      </div>
    </>
  )
}

export default DashboardTickets