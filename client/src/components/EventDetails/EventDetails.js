import './EventDetails.scss'

const EventDetails = ({ eventItem }) => {
  return(
    !eventItem.budget?<p>Loading..</p> :
    <div className="event">
      <div className="vendor-item">
        <h2 className="event__heading">{eventItem.title}</h2>
        <p className="event__description">{eventItem.description}</p>
      </div>
      <div className="event__details">
        <div className="event__details__item">
          <p className="vendor-item__header">Budget</p>
          <p className="event__detail">{eventItem.budget.currency} {eventItem.budget.amount}</p>
        </div>
        <div className="event__details__item">
          <p className="vendor-item__header">Guest Aprox*</p>
          <p className="event__detail">{eventItem.guests} people</p>
        </div>
        <div className="event__details__item">
          <p className="vendor-item__header">Event Date</p>
          <p className="event__detail">{new Date(eventItem.eventDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetails;