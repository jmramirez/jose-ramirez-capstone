import './EventList.scss'
import {Link} from 'react-router-dom'
import {EventItem} from '../EventItem/EventItem'

export const EventList = ({ events, role }) => (
  <ul className="events">
    {
      events.length===0 ?
        <li><p className="events__no-items">You have no future events</p></li>:
        events.map(event =>{
          return(
            <li className="events-items"  key={event.id}>
              <EventItem event={event} />
            </li>
          )
        })}
    {(role ==='Planer') && <li className="events__add-item"><Link to="/event/add" className="events__add-link"><span className="material-icons events__add-link-icon">event</span>Add New Event</Link></li>}
  </ul>
)