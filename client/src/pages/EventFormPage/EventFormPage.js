import './EventFormPage.scss'
import { EventForm }  from '../../components/EventForm/EventForm'
import {VendorForm} from '../../components/VendorForm/VendorForm';
import {PaymentForm} from '../../components/PaymentForm/PaymentForm';
import {MessageForm} from '../../components/MessageForm/MessageForm';

const EventFormPage = ({ action, match, history, handleUpdate, authenticated, elementType }) => {
  return(
    <section className="form-section">
      {elementType === 'event' && (<EventForm action={(action ==="add")? "Add New" : "Edit"} history={history} match={match} handleUpdate={handleUpdate} authenticated={authenticated}/>)}
      {elementType === 'vendor' &&(<VendorForm action={(action ==="add")? "Add" : "Edit"} match={match} authenticated={authenticated} handleUpdate={handleUpdate}/>)}
      {elementType === 'vendorEvent' && (<PaymentForm match={match} authenticated={authenticated} handleUpdate={handleUpdate} />)}
      {action === 'message' && <MessageForm />}
    </section>
  )
}

export default  EventFormPage;