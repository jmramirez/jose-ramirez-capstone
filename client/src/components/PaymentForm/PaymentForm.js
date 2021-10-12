import './PaymentForm.scss'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../config';
import {Icon} from '../Icon/Icon';

export  const PaymentForm = ({ match, authenticated }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getEvent = (vendorId, eventId, auth) => {
      axios.get(`${url}vendor/${vendorId}/${eventId}`,{
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      })
        .then(response => {
          setEvent(response.data)
          setLoading(false)
        })
    }
    if(authenticated && match.params.vendorId && match.params.eventId){
      getEvent(match.params.vendorId, match.params.eventId, authenticated)
    }
  })

  return(
    loading ? <h2>Loading...</h2>
      :
    <main className="paymentForm">
      <div className="paymentForm__header">
        <h2>Register Payment</h2>
      </div>
      <form className="paymentForm__form">
        <div className="paymentForm__form__row">
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Event Name:</label>
            <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--info">{event.title}</label>
          </div>
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Organized by:</label>
            <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--info">{event.creatorName}</label>
          </div>
        </div>
        <div className="paymentForm__form__row">
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Budget:</label>
            <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--info">{event.budget.currency} {event.budget.amount}</label>
          </div>
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Deposit Paid:</label>
            <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--info">{event.depositPaid.currency} {event.depositPaid.amount}</label>
          </div>
        </div>
        <div className="paymentForm__form__row">
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Make Payment:</label>
            <input className="paymentForm__form__row-controls__input"/>
          </div>
        </div>
        <div className="paymentForm__form__actions">
          <button type="button" className="paymentForm__form__actions__button">Cancel</button>
          <button type="button" className="paymentForm__form__actions__button">
            <Icon name="attach_money"/> Register Payment
          </button>
        </div>
      </form>
    </main>
  )
}