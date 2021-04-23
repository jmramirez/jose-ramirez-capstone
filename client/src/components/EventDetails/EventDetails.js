import './EventDetails.scss'
import {Link} from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../config'
import VendorList from '../VendorsList/VendorsList'

const EventDetails = ({ eventItem, user }) => {
  const [vendors, setVendors] = useState([])
  const [role, setRole] = useState('')
  const [budgetCovered, setBudgetCovered ] = useState(0);
  const eventId = eventItem.id

  useEffect(()=> {
    if(eventId){
      axios.get(`${url}events/${eventId}/vendors`).then(response =>{
        console.log(response.data)
        setVendors(response.data)
      })
    }
  }, [eventId])

  useEffect(() => {
    if(user){
      setRole(user.role)
    }
  }, [user])

  useEffect(() => {
    const aproxBudget = vendors.reduce((acc, item) => {
      return acc + item.budget.amount;
    }, 0);
    setBudgetCovered(aproxBudget);
    //updateBudget(totalBudget);
  }, [vendors]);

  return(
    !eventItem.budget?<p>Loading..</p> :
    <div className="event">
      <div className="vendor-item">
        <div className="event__top">
          <h2 className="event__heading">{eventItem.title}</h2>
          {role && role === 'Planer' &&(
          <div className="event__actions">
            <Link to={`/event/edit/${eventItem.id}`} className="event__editvendor">
              <span className="material-icons add-event__form__submit__icon">edit_calendar</span> Edit Event</Link>
            <Link to={`/vendor/add/${eventItem.id}`} className="event__addvendor">
              <span className="material-icons add-event__form__submit__icon">add</span> Add Vendor
            </Link>
          </div>
          )}
        </div>

        <p className="event__description">{eventItem.description}</p>
        {role && role === 'Vendor' &&(
        <div className="event__information">
          <p className="event__information__description">Organized by: {eventItem.creatorName}</p>
          <p className="event__information__description">Phone Number: {eventItem.creatorPhone}</p>
        </div>
        )}


      </div>
      <div className="event__details">

          <div className="event__details__item">
            <p className="vendor-item__header">Budget</p>
            <div className="event__detail__text">
              <p className="event__detail">{eventItem.budget.currency} {eventItem.budget.amount}</p>
            </div>
          </div>


          <div className="event__details__item">
            {role && role === 'Planer' &&(<p className="vendor-item__header">Budget Covered</p>)}
            {role && role === 'Vendor' &&(<p className="vendor-item__header">Deposit Paid</p>)}
            <div className="event__detail__text">
              {role && role === 'Planer' &&(<p className= { budgetCovered > eventItem.budget.amount ? 'event__detail red' : 'event__detail'}>{eventItem.budget.currency} {budgetCovered}</p>)}
              {role && role === 'Vendor' &&(<p className= "event__detail">{eventItem.depositPaid.currency} {eventItem.depositPaid.amount}</p>)}
            </div>
          </div>
        <div className="event__details__item">
          <p className="vendor-item__header">Guest Aprox*</p>
          <div className="event__detail__text">
            <p className="event__detail">{eventItem.guests} people</p>
          </div>
        </div>
        <div className="event__details__item">
          <p className="vendor-item__header">Event Date</p>
          <div className="event__detail__text">
            <p className="event__detail">{new Date(eventItem.eventDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      {role && role ==='Planer' && <VendorList vendors={vendors} eventId={eventItem.id}/>}
    </div>
  )
}

export default EventDetails;