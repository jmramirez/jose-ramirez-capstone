import './EventItem.scss'
import {Link} from 'react-router-dom'

export const EventItem = ({ event }) => (
  <Link to={`/getevent/${event.id}`} className="event-item">
    <p className="event-item-title-title">{event.title}</p>
    <p className="event-item-date">Date: { new Date(event.eventDate).toLocaleDateString()}</p>
  </Link>
)