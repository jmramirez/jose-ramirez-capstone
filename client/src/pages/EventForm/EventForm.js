
import EventsForm  from '../../components/AddEventForm/EventsForm'

const EventForm = ({ action, match, history, handleUpdate, user }) => {
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <EventsForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate} user={user}/>
      </div>
    </div>
  )
}

export default  EventForm;