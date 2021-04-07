import AddVendorForm from '../../components/AddVendorForm/AddVendorForm'
import EventsForm  from '../../components/AddEventForm/EventsForm'

const EventForm = ({ action }) => {
  return(
    <div className="dashboard">
      <div className="dashboard-content">
        <EventsForm action={(action ==="add")? "Add New" : "Edit "} />
      </div>
    </div>
  )
}

export default  EventForm;