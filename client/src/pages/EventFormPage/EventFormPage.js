import './EventFormPage.scss'
import { EventForm }  from '../../components/EventForm/EventForm'
import {VendorsForm} from '../../components/AddVendorForm/VendorsForm';

const EventFormPage = ({ action, match, history, handleUpdate, authenticated, elementType }) => {
  return(
    <section className="form-section">
      {elementType === 'event' && (<EventForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate} authenticated={authenticated}/>)}
      {elementType === 'vendor' &&(<VendorsForm action={(action ==="add")? "Add" : "Edit"} />)}
    </section>
  )
}

export default  EventFormPage;