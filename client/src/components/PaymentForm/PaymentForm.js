import './PaymentForm.scss'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../config';
import {Icon} from '../Icon/Icon';
import {useHistory} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';




export  const PaymentForm = ({ match, authenticated, handleUpdate }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const schema = yup.object().shape({
    payment: yup.number().typeError('Deposit Paid is required, should be a number').min(0, "Deposit Paid should be greater than 0").max(event && (event.budget.amount - event.depositPaid.amount), "The payment exceed budget amount")
  })

  const { register, handleSubmit, formState: {errors}, clearErrors} = useForm({
    resolver: yupResolver(schema)
  })

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
  }, [authenticated, match.params])

  const onSubmit = (data) => {
    console.log(data)
    axios.put(`${url}vendor/eventVendor`,{
      eventId: match.params.eventId,
      vendorId: match.params.vendorId,
      budget: {
        "amount": event.budget.amount,
        "currency": "CAD"
      },
      depositPaid: {
        "amount": data.payment + event.depositPaid.amount,
        "currency": "CAD"
      }
    })
      .then(response =>{
       console.log(response.data)
        handleUpdate("vendorEvents")
        history.push('/')
      })
  }


  const goBack = () => {
    history.goBack()
  }

  return(
    loading ? <h2>Loading...</h2>
      :
    <main className="paymentForm">
      <div className="paymentForm__header">
        <h2>Register Payment</h2>
      </div>
      <form className="paymentForm__form" onSubmit={handleSubmit(onSubmit)}>
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
            <label className="paymentForm__form__row-controls__label">Amount difference:</label>
            <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--info">{event.budget.currency} {event.budget.amount-event.depositPaid.amount}</label>
          </div>
          <div className="paymentForm__form__row-controls">
            <label className="paymentForm__form__row-controls__label">Make Payment:</label>
            {
              event.budget.amount === event.depositPaid.amount ?
                <label className="paymentForm__form__row-controls__label paymentForm__form__row-controls__label--paid">Total budget amount is paid</label>
                :
              <>
                <input className="paymentForm__form__row-controls__input" name={'payment'} {...register("payment")} autoComplete="off"/>
                {errors.payment && <p className="paymentForm__error">{errors.payment?.message}</p>}
              </>
            }
          </div>
        </div>
        <div className="paymentForm__form__actions">
          <button type="button" className="paymentForm__form__actions__button" onClick={goBack}>Cancel</button>
          {
            event.budget.amount > event.depositPaid.amount &&
            <button className="paymentForm__form__actions__button">
              <Icon name="attach_money"/> Register Payment
            </button>
          }
        </div>
      </form>
    </main>
  )
}