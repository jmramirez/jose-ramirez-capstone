import './EventsList.scss'
import {EventItem} from '../EventItem/EventItem';


export const EventsList = ({ events, user }) => (
  <ul>
    { events.map(event => (
      <li key={event.id}>
        <EventItem event={event} user={user} />
      </li>
    ))}
  </ul>
)