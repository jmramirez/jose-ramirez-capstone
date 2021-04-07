
import EventsForm  from '../../components/AddEventForm/EventsForm'

const EventForm = ({ action, match, history, handleUpdate }) => {
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <EventsForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate}/>
      </div>
    </div>
  )
}

export default  EventForm;