import './EventsPage.scss'
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {EventsList} from '../../components/EventsList/EventsList';

export const EventsPage = ({ events, handleChange, user }) => {
  return(
    <div className="events">
      <PageHeader elementType={(user && user.role ==='Planner')?"Events":"Vendors"} buttonText={(user && user.role ==='Planner')?"Create New Event":"Edit Vendor Info"} handleChange={handleChange} user={user}/>
      <div className="events-content">
        <EventsList events={events} user={user} />
      </div>
    </div>
  )
}