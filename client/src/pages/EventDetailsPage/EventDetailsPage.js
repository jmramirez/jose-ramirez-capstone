import './EventDetailsPage.scss'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../config';
import {PageHeader} from '../../components/PageHeader/PageHeader';
import {Link} from 'react-router-dom';
import {Icon} from '../../components/Icon/Icon';

export const EventDetailsPage = ({ match, user, authenticated }) => {
  const [eventId, setEventId] = useState('')
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [budgetCovered, setBudgetCovered ] = useState(0)

  useEffect(() => {
    const getEvent = (eventId) => {
      axios.get(`${url}events/${eventId}`,{
        headers: {
          'Authorization' : `Bearer ${authenticated}`
        }
      })
        .then(response => {
          setEvent(response.data)
          setLoading(false)
        })
    }
    if(authenticated && match.params.eventId)
    getEvent(match.params.eventId)
  }, [authenticated, match.params.eventId])

  return(
    loading ?
      <h2>Loading...</h2>
    :
      <div className="event">
        <div className="event-header">
          <div>
            <h2 className="event-header__heading">{event.title}</h2>
          </div>
          {
            user && user.role === 'Planner' &&(
              <div className="event-header__action">

                <Link to="/" className="event-header__action__links">
                  <Icon name="edit_calendar" /> Edit Event
                </Link>
                <Link to="/" className="event-header__action__links">
                  <Icon name="add" /> Add Vendor
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
      </div>

  )
}