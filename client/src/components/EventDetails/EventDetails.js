import './EventDetails.scss'
import {Link} from 'react-router-dom'

const EventDetails = ({ eventItem }) => {
  return(
    !eventItem.budget?<p>Loading..</p> :
    <div className="event">
      <div className="vendor-item">
        <div className="event__top">
          <h2 className="event__heading">{eventItem.title}</h2>
          <div className="event__actions">
            <Link to={`/event/edit/${eventItem.id}`} className="event__addvendor__cancel">Edit Event</Link>
            <Link to={`/vendor/add/${eventItem.id}`} className="event__addvendor">
              <span className="material-icons add-event__form__submit__icon">add</span> Add Vendor
            </Link>
          </div>
        </div>

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