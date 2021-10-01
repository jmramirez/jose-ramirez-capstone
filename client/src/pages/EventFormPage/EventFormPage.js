import './EventFormPage.scss'
import { EventForm }  from '../../components/EventForm/EventForm'
import {VendorForm} from '../../components/VendorForm/VendorForm';

const EventFormPage = ({ action, match, history, handleUpdate, authenticated, elementType }) => {
  return(
    <section className="form-section">
      {elementType === 'event' && (<EventForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate} authenticated={authenticated}/>)}
      {elementType === 'vendor' &&(<VendorForm action={(action ==="add")? "Add" : "Edit"} match={match} authenticated={authenticated} />)}
    </section>
  )
}

export default  EventFormPage;