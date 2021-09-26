import './EventItem.scss'
import {Link} from 'react-router-dom'

/*
export const EventItem = ({ event }) => (
  <Link to={`/getevent/${event.id}`} className="event-item">
    <p className="event-item-title-title">{event.title}</p>
    <p className="event-item-date">Date: { new Date(event.eventDate).toLocaleDateString()}</p>
  </Link>
)*/


export const EventItem = ({ event }) => (
  <div className="eventItem">
    <Link to="/" className="eventItem__header">{event.title}</Link>
    <div className="eventItem__content">
      <p className="eventItem__content__text--description"><span className="eventItem__content__label">Description: </span>{event.description}</p>
      <p className="eventItem__content__text--date"><span className="eventItem__content__label">Event Date: </span>{new Date(event.eventDate).toLocaleDateString()}</p>
      <p className="eventItem__content__text"><span className="eventItem__content__label">Budget: </span>{event.budget.amount}{event.budget.currency}</p>
      <p className="eventItem__content__text">
        <span className="eventItem__content__label">Guests Aprox*: </span>{event.guests} {event.guests > 1 ? 'people' :'person'}
      </p>
    </div>
  </div>
)