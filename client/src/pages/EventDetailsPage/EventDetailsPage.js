import './EventDetailsPage.scss'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../config';
import {Link, useHistory} from 'react-router-dom';
import {Icon} from '../../components/Icon/Icon';
import VendorList from '../../components/VendorsList/VendorsList';

export const EventDetailsPage = ({ match, user, authenticated }) => {
  const [event, setEvent] = useState(null)
  const [vendors, setVendors] = useState(null)
  const [loadingEvent, setLoadingEvent] = useState(true)
  const [loadingVendors, setLoadingVendors] = useState(true)
  const [budgetCovered, setBudgetCovered ] = useState(0)
  const history = useHistory()

  useEffect(() => {
    const getEvent = (eventId, role) => {
      if(role === 'Planner') {
        axios.get(`${url}events/${eventId}`,{
          headers: {
            'Authorization' : `Bearer ${authenticated}`
          }
        })
          .then(response => {
            setEvent(response.data)
            setLoadingEvent(false)
            return axios.get(`${url}events/${eventId}/eventvendors`)
          })
          .then((response) => {
            setVendors(response.data)
            setLoadingVendors(false)
          })
      }
      else if(role === 'Vendor') {
        axios.get(`${url}events/${eventId}`,{
          headers: {
            'Authorization' : `Bearer ${authenticated}`
          }
        })
          .then(response => {
            setEvent(response.data)
          })
      }
    }
    if(authenticated && match.params.eventId && user)
    getEvent(match.params.eventId, user.role)
  }, [authenticated, match.params.eventId, user])

  useEffect(() => {
    const calcBudget = () => {
      return vendors.reduce((acc, item) => {
        return acc + item.budget.amount
      }, 0);
    }
    if(vendors){
      const aproxBudget = calcBudget()
      setBudgetCovered(aproxBudget)
    }
  }, [vendors])


  const goBack = () => {
    history.push('/')
  }

  return(
    loadingEvent ?
      <h2>Loading Event...</h2>
    :
      <div className="event">
        <div className="event-header">
          <div className="event-header__top">
            <button onClick={goBack} className="event-header__top__button">
              <span className="material-icons icon">keyboard_double_arrow_left</span>
            </button>

            <h2 className="event-header__top__heading">{event.title}</h2>
          </div>
          {
            user && user.role === 'Planner' &&(
              <div className="event-header__action">

                <Link to={`/events/${event.id}/editEvent`} className="event-header__action__links">
                  <Icon name="edit_calendar" /><p className="event-header__action__links-text">Edit Event</p>
                </Link>
                <Link to={`/events/${event.id}/addVendor`} className="event-header__action__links">
                  <Icon name="add" /><p className="event-header__action__links-text">Add Vendor</p>
                </Link>
              </div>
            )
          }
        </div>
        <div className="event-details">
          <div className="event-details__item">
            <p className="event-details__item__heading">Budget</p>
            <div className="event-details__item__content">
              <p  className="event-details__item__content-text">{event.budget.currency} {event.budget.amount}</p>
            </div>
          </div>
          <div className="event-details__item">
            {user && user.role === 'Planner' && (<p className="event-details__item__heading">Budget Covered</p>)}
            {user && user.role === 'Vendor' && (<p className="event-details__item__heading">Deposit Paid</p>)}
            <div className="event-details__item__content">
              {user && user.role === 'Planner' &&
                (
                  <p className={ budgetCovered > event.budget.amount ? 'event-details__item__content-text event-details__item__content-text--red' : 'event-details__item__content-text'}>
                    {event.budget.currency} {budgetCovered}
                  </p>
                )
              }
              {user && user.role === 'Vendor' && (<p className="event-details__item__content-text">{event.depositPaid.currency} {event.depositPaid.amount}</p>)}
            </div>
          </div>
          <div className="event-details__item">
            <p className="event-details__item__heading">Guests Aprox*</p>
            <div className="event-details__item__content">
              <p  className="event-details__item__content-text">{event.guests} {event.guests > 1 ? 'people' :'person'}</p>
            </div>
          </div>
          <div className="event-details__item">
            <p className="event-details__item__heading">Event Date</p>
            <div className="event-details__item__content">
              <p  className="event-details__item__content-text">{new Date(event.eventDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {
          loadingVendors ?
            <h2>Loading Vendors ...</h2>
            :
            user && user.role === 'Planner' && <VendorList vendors={vendors} eventId={event.id} />
        }
      </div>

  )
}