import './EventsList.scss'
import {EventItem} from '../EventItem/EventItem';


export const EventsList = ({ events }) => (
  <ul>
    { events.map(event => (
      <li key={event.id}>
        <EventItem event={event} />
      </li>
    ))}
  </ul>
)