import './EventFormPage.scss'
import EventsForm  from '../../components/AddEventForm/EventsForm'

const EventFormPage = ({ action, match, history, handleUpdate, user }) => {
  return(
    <section className="form-section">
      <EventsForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate} user={user}/>
    </section>
  )
}

export default  EventFormPage;