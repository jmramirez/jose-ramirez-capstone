import './EventsPage.scss'
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {EventsList} from '../../components/EventsList/EventsList';

export const EventsPage = ({ events }) => (
  <div className="events">
    <PageHeader elementType="Events" buttonText="Create New Event"/>
    <div className="events-content">
      <EventsList events={events} />
    </div>
  </div>
)